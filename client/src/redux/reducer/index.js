import { GET_ALL_DOGS, SET_NAME, SET_PAGE } from "../actions";

const initialState = {
	dogs: [],
	page: 1,
	name: "",
	order: ""
}

export default function reducer (state = initialState, { type, payload }) {
	console.log(payload)
	switch(type) {
		case GET_ALL_DOGS:
			return {
				...state, 
				dogs: payload
			}
		case SET_PAGE:
			return {
				...state,
				page: payload
			}
		case SET_NAME:
			return {
				...state,
				name: payload
			}
		default:
			return state;
	}
} 
