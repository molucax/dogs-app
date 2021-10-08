import { 
	GET_ALL_DOGS, 
	GET_TEMPERAMENTS, 
	SET_NAME, 
	SET_PAGE, 
	SET_ORDER, 
	SET_TEMPERAMENT, 
	SET_ORIGIN, 
	GET_DOG, 
	REMOVE_DOG,
	RESET_STATE
} from "../actions";

const initialState = {
	dogs: {},
	// allDogs: {},
	temperaments: [],
	page: 1,
	name: "",
	order: "",
	temperament: "",
	origin: "",
	dog: {},
}

export default function reducer (state = initialState, { type, payload }) {
	// console.log(payload)
	switch(type) {

		case GET_ALL_DOGS:
			let dogs = {...state.dogs}
			let page = state.page;
			const dpp = 8;
			if (state.origin === "created") {
				let filtered = dogs.all.filter(e => e.fromDb)
				let newSliced = filtered.slice(0, 8)
				return {
					...state,
					dogs: {...state.dogs, all: filtered, sliced: newSliced, count: filtered.length} 
				}
			}
			if (state.origin === "existent") {
				let filtered = dogs.all.filter(e => !e.fromDb)
				let newSliced = filtered.slice(0, 8)
				return {
					...state,
					dogs: {...state.dogs, all: filtered, sliced: newSliced, count: filtered.length} 
				}
			}
			else {
				return {
					...state, 
					dogs: payload,
					allDogs: payload
				}
			}

		// case ORDER_BY_NAME:
		// 	let page = state.page;
		// 	let doggies = state.dogs.all;
		// 	if (payload === "asc") {
		// 		doggies = doggies.sort((a, b) => {
		// 			return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
		// 		})
		// 	}
		// 	if (payload === "desc") {
		// 		doggies = doggies.sort((a, b) => {
		// 			return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
		// 		})
		// 	}
		// 	let newSliced = doggies.slice((8 * (page-1)), ((8 * (page-1)) + 8))
		// 	return {
		// 		...state,
		// 		dogs: {...state.dogs, all: doggies, sliced: newSliced, count: doggies.length}
		// 	}

		case RESET_STATE:
			return {
				...state,
				page: 1,
				name: "",
				order: "",
				temperament: "",
				origin: ""
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

		case GET_DOG:
			return {
				...state,
				dog: payload
			}

		case REMOVE_DOG:
			return {
				...state,
				dog: payload
			}

		default:
			return state;
	}
} 
