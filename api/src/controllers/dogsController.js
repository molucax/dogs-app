const axios = require("axios");
const { Dog, Temperament, Op } = require("../db.js");

// /dogs o /dogs?...
const getDogs = async (req, res) => {
	try {    // "" // 1
		let { name, page } = req.query;
		let dogsApi;
		let dogsDb;
		let dogs = [];
		page = page ? page : 1;
		const dogsPerPage = 8;
		// ACÁ ESTÁ
		if (name && name !== "") {
			// console.log("IF NAME")
			dogsApi = (await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)).data;
			dogsDb = await Dog.findAll({
				where: {
					name: {
						[Op.iLike]: `%${name}%`
					}
				}
			})
			dogsDb = [dogsDb[0].dataValues]
			dogs = dogsDb.concat(dogsApi);
			// console.log("DOGS1: ", dogs)	
		}
		else {
			// console.log("ELSE")
			let dogsApi = (await axios.get("https://api.thedogapi.com/v1/breeds")).data
			dogsApi = dogsApi.map(e => {
				return {
					id: e.id,
					name: e.name,
					temperament: e.temperament,
					height: e.height.metric,
					weight: e.weight.metric,
					ls: e.life_span,
					image: e.image.url
				}
			})
			dogsDb = await Dog.findAll({include: Temperament})
			dogsDb = dogsDb.map(e => e.dataValues)
			dogs = dogsDb.concat(dogsApi);
			// console.log("DOGS2: ", dogs)
		}
		let sliced = dogs.slice((dogsPerPage * (page-1)), ((dogsPerPage * (page-1)) + dogsPerPage));
		return res.send({
			sliced,
			count: sliced.length
		});
	}
	catch (err) {
		console.log(err);
	}
} 

const getDogById = async (req, res) => {
	try {
		const { id } = req.params;
		let dog;
		if(isNaN(id)) {
			dog = (await Dog.findAll({
     		 	where: {id},
     		 	include: {
     		 		model: Temperament,
     		 		attributes: ['temperament'],
     				through: {
        				attributes: []
     				}
     		 	}
  		  	}))[0];
			// console.log("DB ", dog)
		}
		else {
			dog = (await axios.get("https://api.thedogapi.com/v1/breeds")).data
			dog = dog.find(e => Number(e.id) === Number(id))
			// console.log("API ", dog)
		}
		res.json(dog);
	}
	catch (err) {
		console.log(err);
	}
}

module.exports = {
	getDogs,
	getDogById
}