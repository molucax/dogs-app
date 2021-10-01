import axios from "axios";
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const SET_NAME = "SET_NAME";
export const SET_PAGE = "SET_PAGE";
export const SET_ORDER = "SET_ORDER";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const SET_ORIGIN = "SET_ORIGIN";
export const SET_TEMPERAMENT = "SET_TEMPERAMENT";


export const getAllDogs = ({ page, order, temperament, name, origin }) => {
	return async (dispatch) => {
		try { 
			const dogsPerPage = 8;
			let dogs = (await axios.get(`http://localhost:3001/dogs?
				page=${page?page:1}
				&
				order=${order?order:""}
				&
				temperament=${temperament?temperament:""}
				&
				name=${name?name:""}
			`)).data
			// dogs = {sliced, all, count}
			if (origin) {
				if (origin === "existent") {
					dogs = {...dogs, all: dogs.all.filter(e => !e.fromDb)}
				}
				if (origin === "created") {
					dogs = {...dogs, all: dogs.all.filter(e => e.fromDb)}
				} 
				dogs = {
					...dogs,
					sliced: dogs.all.slice((dogsPerPage * (page-1)), ((dogsPerPage * (page-1)) + dogsPerPage)),
					count: dogs.all.length
				}
			}
			return dispatch({
				type: GET_ALL_DOGS,
				payload: dogs
			})	
		}
		catch (err) {
			console.log(err);
		}	
	}
}

export const settingPage = (page) => {
	return {
		type: SET_PAGE,
		payload: page
	}
}

export const settingName = (name) => {
	return {
		type: SET_NAME,
		payload: name
	}
}

export const settingOrder = (order) => {
	return {
		type: SET_ORDER,
		payload: order
	}
}

export const settingTemperament = (temperament) => {
	return {
		type: SET_TEMPERAMENT,
		payload: temperament
	}
}

export const settingOrigin = (origin) => {
	return {
		type: SET_ORIGIN,
		payload: origin
	}
}

export const getTemperaments = () => {
	return (dispatch) => {
		axios.get("http://localhost:3001/temperament")
		.then(info => {
			return dispatch({
				type: GET_TEMPERAMENTS,
				payload: info.data
			})
		})
		.catch(err => console.log(err))
	}	
}