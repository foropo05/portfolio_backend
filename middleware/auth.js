const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";

    if (!authHeader.startsWith("Bearer ")) {
      return next(createError(401, "Authorization token is required"));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(createError(401, "Authorization token is required"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    req.user = decoded;

    next();
  } catch (err) {
    return next(createError(401, "Invalid or expired token"));
  }
};