const { Router } = require('express');

const dogsR = require ("./dogsR.js");
const temperamentR = require("./temperamentR.js");
const dogR = require("./dogR.js");

const router = Router();

router.use("/dogs", dogsR);
router.use("/temperament", temperamentR);
router.use("/dog", dogR);


module.exports = router;
