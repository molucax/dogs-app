import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllDogs, settingPage, settingName } from "../redux/actions";

const Search = () => {

	const dispatch = useDispatch();

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
			name: input 
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