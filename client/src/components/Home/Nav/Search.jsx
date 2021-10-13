import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, settingPage, settingName } from "../../../redux/actions";
import s from "./Search.module.css";

const Search = () => {

	const dispatch = useDispatch();
	const { name, order, temperament, origin } = useSelector(state => state);

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

	const handleButton = () => {
		dispatch(settingName(""));
		dispatch(settingPage(1));
		dispatch(getAllDogs({ name: "", order, temperament, origin}));
	}

	return (
		<div className={s.searchContainer}>
			<h3>SEARCH</h3>
			<form onSubmit={onSubmit}>
				<input 
					className={s.input}
					type="text" 
					place="Search..." 
					onChange={handleOnChange} 
					value={input} />
				<button className={s.btn} type="submit">🔍</button>
			</form>
			<div className={s.showName}>
				{ name ? <p className={s.p}>{name}</p> : null}
				{ name ? <button className={s.btnX} onClick={handleButton}>X</button> : null }
			</div>
		</div>
	)
}

export default Search;