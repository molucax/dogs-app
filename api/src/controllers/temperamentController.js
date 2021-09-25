const { Temperament } = require("../db.js");
const axios = require("axios");

const preloadTemperaments = async (req, res) => {
	try {
		let info = (await axios.get("https://api.thedogapi.com/v1/breeds")).data
		info = info.map(e => e.temperament)
		let string = info.toString();
		let array = string.split(",");
		array = array.map(str => str.trim())
		let temperaments = [...new Set(array)]
		temperaments = await Promise.all(temperaments.map(e => { Temperament.findOrCreate({where: {temperament: e}})}))
		return "Temperaments loaded succesfully!"
	}
	catch (err) {
		return "Error loading temperaments :("
	}
}

const getTemperaments = async (req, res) => {
	try {
		let temperaments = await Temperament.findAll();
		res.json(temperaments);
	}
	catch (err) {
		console.log(err)
	}
}

module.exports = {
	preloadTemperaments,
	getTemperaments
}