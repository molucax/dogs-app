const { Router } = require('express');

const temperamentR = require("./temperamentR.js")

const router = Router();

router.use("/temperament", temperamentR)


module.exports = router;
