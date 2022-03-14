const { Router } = require("express");
const { createDog } = require("../controllers/dogController.js");

const router = Router();

router.post("/", createDog);

module.exports = router;