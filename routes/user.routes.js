const router = require("express").Router();
const c = require("../controllers/user.controller");
const auth = require("../middleware/auth");

// AUTH ROUTES
router.post("/signup", c.signup);
router.post("/signin", c.signin);

// CRUD ROUTES
router.post("/", c.add);
router.get("/", c.getAll);
router.get("/:id", c.getById);

// PROTECTED ROUTES
router.put("/:id", auth, c.update);
router.delete("/:id", auth, c.remove);

module.exports = router;