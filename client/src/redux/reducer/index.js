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
			let dogs = payload;
			if (!dogs.error) {
				let order = state.order;
				let page = state.page;
				const dpp = 8;
				let all = [...dogs.all]
				if (order === "asc" || !order || order === "") {
					all = all.sort((a, b) => {
						return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
					})
				}
				if (order === "desc") {
					all = all.sort((a, b) => {
						return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
					})
				}
				let sliced = all.slice((dpp * (page-1)), ((dpp * (page-1)) + dpp))
				dogs = {...dogs, all: all, count: all.length, sliced: sliced}
			}
			return {
				...state,
				dogs: dogs,
			}
			
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
