const { Router } = require("express");
const { getDogs, getDogById } = require("../controllers/dogsController.js");

const router = Router();

router.get("/", getDogs);
router.get("/:id", getDogById);

module.exports = router;