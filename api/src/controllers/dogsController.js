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
			dogsApi = dogsApi.map(e => {
				return {
					id: e.id,
					name: e.name,
					height: e.height.metric,
					weight: e.weight.metric,
					ls: e.life_span,
					temperament: e.temperament,
					image: e.reference_image_id ? `https://cdn2.thedogapi.com/images/${e.reference_image_id}.jpg` : null,
				}
			})
			dogsDb = await Dog.findAll({
				where: {
					name: {
						[Op.iLike]: `%${name}%`
					}
				},
				include: {
     		 		model: Temperament,
     		 		attributes: ['temperament'],
     				through: {
        				attributes: []
     				}
     		 	}
			})
			dogsDb = dogsDb.map(e => e.dataValues)
			dogsDb = dogsDb.map(obj => {
				let temperament = obj.Temperaments?.map(e => e.temperament);
				temperament = temperament.join(", ") 
				return {
					...obj,
					temperament: temperament
				}
			})
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
				let temperament = obj.Temperaments.map(e => e.temperament)
				temperament = temperament.join(", ")
				return {
					...obj, 
					temperament: temperament 
				}
			})
			dogs = dogsDb.concat(dogsApi);
		}

		// FILTRADO TEMPERAMENT
		if (temperament && temperament !== "") {
			dogs = dogs.filter(e => e.temperament?.includes(temperament))
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

		if (!dogs.length) {
			return res.send({
				error: true,
			});
		}

		// ORDENAMIENTO POR PESO
		if (order) {
			if (order === "light") {
				dogs = dogs.sort((a, b) => {
				    let aa = a.weight.split(" - ");
				    let bb = b.weight.split(" - ");
				    let aMin = Number(aa[0]);
				    let bMin = Number(bb[0]); 
				    let aMax = aa.length === 1 ? Number(aa[0]) : Number(aa[1]);
				    let bMax = bb.length === 1 ? Number(bb[0]) : Number(bb[1]);
				    if (aMin > bMin) return 1;
				    if (aMin < bMin) return -1;
				    if (aMin === bMin) {
				      let difA = aMax - aMin;
				      let difB = bMax - bMin;
				      if(difA > difB) return 1;
				      if(difA < difB) return -1;
				      if(difA === difB) return 0;
				    }
				    return 0;
				})
			}
			if (order === "heavy") {
				dogs = dogs.sort((a, b) => {
				 	let aa = a.weight.split(" - ");
				    let bb = b.weight.split(" - ");
				    let aMin = Number(aa[0]);
				    let bMin = Number(bb[0]); 
				    let aMax = aa.length === 1 ? Number(aa[0]) : Number(aa[1]);
				    let bMax = bb.length === 1 ? Number(bb[0]) : Number(bb[1]);
				    if (aMax > bMax) return -1;
				    if (aMax < bMax) return 1;
				    if (aMax === bMax) {
				      let difA = aMax - aMin;
				      let difB = bMax - bMin;
				      if(difA < difB) return -1;
				      if(difA > difB) return 1;
				      if(difA === difB) return 0;
				    }
				    return 0;
				})
			}
		}
		return res.send({
			all: dogs, 
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