import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Search from "./Search.jsx";
import Order from "./Order.jsx";
import Filter from "./Filter.jsx";
import { useDispatch } from "react-redux";
import { getAllDogs } from "../redux/actions";

const NavBarContainer = styled.div`
`
const NavBarLink = styled(NavLink)`
`

const Nav = () => {
	const dispatch = useDispatch();
	const handleReset = () => {
		dispatch(getAllDogs({}))
	}
	return (
		<NavBarContainer>
			<NavBarLink to="/create">CREATE A BREED</NavBarLink>
			<button onClick={handleReset}>RESET</button>
			<Search />
			<Order />
			<Filter />
		</NavBarContainer>
	)
}

export default Nav;