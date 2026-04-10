const router = require("express").Router();
const c = require("../controllers/service.controller");
const auth = require("../middleware/auth");

//  PUBLIC
router.get("/", c.getAll);
router.get("/:id", c.getById);

//  PROTECTED
router.post("/", auth, c.add);
router.put("/:id", auth, c.update);
router.delete("/:id", auth, c.remove);

module.exports = router;