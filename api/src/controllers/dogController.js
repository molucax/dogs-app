const { Dog, Temperament } = require("../db.js");

const createDog = async (req, res) => {
	const { name, height, weight, ls, temperaments, fromDb } = req.body;
	try {
		let newDog = await Dog.create({
			name: name.toLowerCase(),
			height,
			weight,
			ls,
			fromDb
		})
		let temp = await Temperament.findAll({
			where: {
				temperament: temperaments,
			},
		})
		newDog.addTemperament(temp);
		res.json(newDog);
	}
	catch (err) {
		res.send(err);
	}
}

module.exports = {
	createDog
}