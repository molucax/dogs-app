import React from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search.jsx";
import Order from "./Order.jsx";
import Filter from "./Filter.jsx";
import { useDispatch } from "react-redux";
import { getAllDogs, resetState } from "../redux/actions";
import s from "./Nav.module.css";

const Nav = () => {
	const dispatch = useDispatch();
	const handleReset = () => {
		dispatch(resetState())
		dispatch(getAllDogs({}))
	}
	return (
		<div className={s.nav}>
			<NavLink to="/create">CREATE A BREED</NavLink>
			<button onClick={handleReset}>RESET</button>
			<Search />
			<Order />
			<Filter />
		</div>
	)
}

export default Nav;