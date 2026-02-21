const router = require("express").Router();
const c = require("../controllers/service.controller");

router.get("/", c.getAll);
router.get("/:id", c.getById);
router.post("/", c.add);        
router.put("/:id", c.update);
router.delete("/:id", c.remove);

module.exports = router;