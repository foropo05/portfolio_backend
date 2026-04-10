const router = require("express").Router();
const c = require("../controllers/project.controller");
const auth = require("../middleware/auth");

// PUBLIC
router.get("/", c.getAll);
router.get("/:id", c.getById);

// PROTECTED (REQUIRED BY ASSIGNMENT)
router.post("/", auth, c.add);
router.put("/:id", auth, c.update);
router.delete("/:id", auth, c.remove);

module.exports = router;