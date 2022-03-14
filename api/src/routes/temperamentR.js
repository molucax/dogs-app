const { Router } = require('express');
const { getTemperaments } = require("../controllers/temperamentController.js");

const router = Router();

//           /temperament
router.get("/", getTemperaments);

module.exports = router;