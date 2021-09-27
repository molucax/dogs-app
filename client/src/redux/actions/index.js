import axios from "axios";
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const SET_NAME = "SET_NAME";
export const SET_PAGE = "SET_PAGE";


export const getAllDogs = ({ name, page }) => {
	return (dispatch) => {
		// "" da false
		axios.get(`http://localhost:3001/dogs?
			page=${page?page:1}
			&
			name=${name?name:""}
		`) 
		.then(info => {
			console.log("info: ", info.data.sliced)
			return dispatch({
				type: GET_ALL_DOGS,
				payload: info.data.sliced
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