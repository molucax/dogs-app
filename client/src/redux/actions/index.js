import axios from "axios";
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const SET_NAME = "SET_NAME";
export const SET_PAGE = "SET_PAGE";
export const SET_ORDER = "SET_ORDER";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";

export const getAllDogs = ({ page, order, name }) => {
	return (dispatch) => {
		// "" da false
		axios.get(`http://localhost:3001/dogs?
			page=${page?page:1}
			&
			order=${order?order:""}
			&
			name=${name?name:""}
		`) 
		.then(info => {
			return dispatch({
				type: GET_ALL_DOGS,
				payload: info.data
			})
		})
		.catch((err) => {
			console.log(err)
		})
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

export const getTemperaments = () => {
	return (dispatch) => {
		axios.get("http://localhost:3001/temperament")
		.then(info => {
			return dispatch({
				type: GET_TEMPERAMENTS,
				payload: info.data
			})
		})
	}	
}

export const filterByTemperament = (temperament) => {
	return {
		type: FILTER_BY_TEMPERAMENT,
		payload: temperament
	}
}