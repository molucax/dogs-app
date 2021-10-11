import React from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search.jsx";
import Order from "./Order.jsx";
import Filter from "./Filter.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, resetState } from "../redux/actions";
import s from "./Nav.module.css";

const Nav = () => {
	const dispatch = useDispatch();
	const { name, temperament, origin, order } = useSelector(state => state)
	const handleReset = () => {
		dispatch(resetState())
		dispatch(getAllDogs({}))
	}
	return (
		<div className={s.nav}>
			<div className={s.btnContainer}>
				<NavLink to="/create">
					<button>Create a Dog's Breed</button>
				</NavLink>
			</div>
			<div className={s.sof}>
				<div className={s.search}>
					<h5>Search:</h5>
					<Search />
				</div>
				<div className={s.search}>
					<h5>Filter:</h5>
					<Filter />
				</div>
				<div className={s.search}>
					<h5>Order:</h5>
					<Order />
				</div>
			</div>
			<div className={s.reset}>
				<button onClick={handleReset}>RESET</button>
			</div>
			<div className={s.showFilters}>
				<p>{name}</p>
				<p>{temperament}</p>
				<p>{origin}</p>
				<p>{order}</p>
			</div>
			{/*<div>
				<p>{temperament ? `${temperament.toUpperCase()}` : null}</p>
			</div>*/}
		</div>
	)
}

export default Nav;