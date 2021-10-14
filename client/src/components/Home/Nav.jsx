import React from "react";
import { NavLink } from "react-router-dom";
import Search from "./Nav/Search.jsx";
import Order from "./Nav/Order.jsx";
import Filter from "./Nav/Filter.jsx";
import { useDispatch } from "react-redux";
import { getAllDogs, resetState } from "../../redux/actions";
import s from "./Nav.module.css";

const Nav = () => {
	const dispatch = useDispatch();
	const handleReset = () => {
		dispatch(resetState())
		dispatch(getAllDogs({}))
	}
	return (
		<div className={s.nav}>
			<div className={s.create}>
				<NavLink className={s.navlink} to="/create">
					<button className={s.btnCreate}>Create a Dog Breed</button>
				</NavLink>
			</div>
			<div className={s.sforContainer}> 
				<div className={s.sfor}>
					<div className={s.inputContainer}>
						<Search />
					</div>
					<div className={s.inputContainer}>
						<Filter />
					</div>
					<div className={s.inputContainer}>
						<Order />
					</div>
					<div className={s.btnContainer}>
						<button className={s.btnReset} onClick={handleReset}>RESET</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Nav;