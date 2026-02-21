const router = require("express").Router();
const c = require("../controllers/reference.controller");

router.post("/", c.add);
router.get("/", c.getAll);
router.get("/:id", c.getById);
router.put("/:id", c.update);
router.delete("/:id", c.remove);

module.exports = router;