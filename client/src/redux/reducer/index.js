import { GET_ALL_DOGS, GET_TEMPERAMENTS, SET_NAME, SET_PAGE, SET_ORDER, SET_TEMPERAMENT, SET_ORIGIN } from "../actions";

const initialState = {
	dogs: {},
	allDogs: {},
	temperaments: [],
	page: 1,
	name: "",
	order: "",
	temperament: "",
	origin: "",
}

export default function reducer (state = initialState, { type, payload }) {
	// console.log(payload)
	switch(type) {
		case GET_ALL_DOGS:
			return {
				...state, 
				dogs: payload,
				allDogs: payload
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
		case SET_ORDER:
			return {
				...state,
				order: payload
			}
		case SET_TEMPERAMENT:
			return {
				...state,
				temperament: payload
			}
		case SET_ORIGIN:
			return {
				...state,
				origin: payload
			}
		case GET_TEMPERAMENTS:
			return {
				...state,
				temperaments: payload
			}
		default:
			return state;
	}
} 
