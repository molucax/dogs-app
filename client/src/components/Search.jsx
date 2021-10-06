import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, settingPage, settingName } from "../redux/actions";

const Search = () => {

	const dispatch = useDispatch();
	const { order, temperaments, origin } = useSelector(state => state);

	const [input, setInput] = useState("");

	const handleOnChange = (e) => {
		e.preventDefault();
		setInput(e.target.value);
	}

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(settingName(input))
		dispatch(getAllDogs({ 
			page: 1, 
			name: input,
			order,
			temperaments,
			origin,
		}))
		dispatch(settingPage(1));
		setInput("");
	}

	return (
		<form onSubmit={onSubmit}>
			<input 
				type="text" 
				place="Search..." 
				onChange={handleOnChange} 
				value={input} />
			<button type="submit">🔦</button>
		</form>
	)
}

export default Search;