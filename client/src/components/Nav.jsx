import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Search from "./Search.jsx";
import Order from "./Order.jsx";
import Filter from "./Filter.jsx";

const NavBarContainer = styled.div`
`
const NavBarLink = styled(NavLink)`
`

const Nav = () => {
	return (
		<NavBarContainer>
			<NavBarLink to="/create">CREATE A BREED</NavBarLink>
			<Search />
			<Order />
			<Filter />
		</NavBarContainer>
	)
}

export default Nav;