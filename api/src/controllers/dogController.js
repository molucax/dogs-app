const { Dog, Temperament, Op } = require("../db.js");

const createDog = async (req, res) => {
	const { name, hmin, hmax, wmin, wmax, lsmin, lsmax, temperaments } = req.body;
	try {
		let newDog = await Dog.create({
			name: name.toLowerCase(),
			height: `${hmin} - ${hmax}`,
			weight: `${wmin} - ${wmax}`,
			ls: `${lsmin} - ${lsmax} years`,
			fromDb: true
		})
		let arrTemps = temperaments.split(", ")
		let temp = await Temperament.findAll({
			where: {
				temperament: {
						[Op.in]: arrTemps
					}
			},
		})
		await newDog.addTemperament(temp);
		// console.log(newDog);
		res.send("Dog created successfully!");
	}
	catch (err) {
		console.log("Error en create!");
	}
}

module.exports = {
	createDog
}