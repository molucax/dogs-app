const axios = require("axios");
const { Dog, Temperament, Op } = require("../db.js");

// /dogs o /dogs?...
const getDogs = async (req, res) => {
	try {
		let { name, order, temperament, origin } = req.query;
		let dogsApi;
		let dogsDb;
		let dogs = [];
		
		if (name && name !== "") {
			dogsApi = (await axios.get(`
				https://api.thedogapi.com/v1/breeds/search?q=${name}
			`)).data;
			dogsDb = await Dog.findAll({
				where: {
					name: {
						[Op.iLike]: `%${name}%`
					}
				}
			})
			console.log("dogs DB: ", dogsDb)
			dogsDb = dogsDb.map(e => e.dataValues)
			dogs = dogsDb.concat(dogsApi);	
		}
		else {
			dogsApi = (await axios.get("https://api.thedogapi.com/v1/breeds")).data
			dogsApi = dogsApi.map(e => {
				return {
					id: e.id,
					name: e.name,
					temperament: e.temperament ? e.temperament : "Unknown",
					height: e.height.metric,
					weight: e.weight.metric ? e.weight.metric : "0",
					ls: e.life_span,
					image: e.image.url
				}
			})
			dogsDb = await Dog.findAll({include: Temperament})
			dogsDb = dogsDb.map(e => e.dataValues)
			dogsDb = dogsDb.map(obj => { 
				let temps = obj.Temperaments.map(elem => elem.temperament)
				temps = temps.join(", ")
				return {...obj, temperament: temps }
			})
			dogs = dogsDb.concat(dogsApi);
		}

		// FILTRADO TEMPERAMENT
		if (temperament && temperament !== "") {
			dogs = dogs.filter(e => e.temperament.includes(temperament))
		}

		// FILTRADO POR ORIGEN
		if (origin && origin !== "") {
			if (origin === "created") {
				let filtered = dogs.filter(e => e.fromDb)
				dogs = filtered
			}
			if (origin === "existent") {
				let filtered = dogs.filter(e => !e.fromDb)
				dogs = filtered
			}
		}
		else {
			dogs = dogs;
		}

		// ORDENAMIENTO POR PESO
		if (order === "light") {
			dogs = dogs.sort((a, b) => {
				let aMin = a.weight.split(" - ")[0];
				let bMin = b.weight.split(" - ")[0];
				if (Number(aMin) > Number(bMin)) return 1;
				if (Number(aMin) < Number(bMin)) return -1;
				return 0;
			})
		}
		if (order === "heavy") {
			dogs = dogs.sort((a, b) => {
				let aMax = a.weight.split(" - ");
				let bMax = b.weight.split(" - ");
				aMax = aMax.length === 1 ? aMax[0] : aMax[1];
				bMax = bMax.length === 1 ? bMax[0] : bMax[1];
				if (Number(bMax) > Number(aMax)) return 1;
				if (Number(bMax) < Number(aMax)) return -1;
				return 0;
			})
		}
		
		return res.send({
			all: dogs, 
			// dogs TODOS, ya filtrados (si corresponde) por cualquier combinación de: name, temperament, order
			count: dogs.length,
		});
	}
	catch (err) {
		console.log(err);
	}
} 

//        /dogs/:id
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
  		  	}))[0].dataValues;
  		  	let t = dog.Temperaments.map(e => e.temperament)
  		  	t = t.join(", ")
  		  	console.log(dog)
  		  	dog = {...dog, temperament: t, image: "https://e7.pngegg.com/pngimages/552/1/png-clipart-dogs-dogs.png"}
		}
		else {
			dog = (await axios.get("https://api.thedogapi.com/v1/breeds")).data
			dog = dog.find(e => Number(e.id) === Number(id))
			let w = dog.weight.metric;
			let h = dog.height.metric;
			dog = {...dog, weight: w, height: h}
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