import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, settingPage, settingName } from "../redux/actions";

const Search = () => {

	const dispatch = useDispatch();
	const { order, temperament, origin } = useSelector(state => state);

	const [input, setInput] = useState("");

	const handleOnChange = (e) => {
		e.preventDefault();
		setInput(e.target.value);
	}

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(settingPage(1));
		dispatch(settingName(input))
		dispatch(getAllDogs({ 
			name: input,
			order,
			temperament,
			origin
		}))
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