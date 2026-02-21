require("dotenv").config();
const express = require("express");

const connectDB = require("./config/db");
const referenceRoutes = require("./routes/reference.routes");
const projectRoutes = require("./routes/project.routes");
const serviceRoutes = require("./routes/service.routes");
const userRoutes = require("./routes/user.routes");
const app = express();
app.use(express.json());

// optional test home route
app.get("/", (req, res) => {
  res.send("✅ API is running");
});

// mount routes
app.use("/api/references", referenceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
});

