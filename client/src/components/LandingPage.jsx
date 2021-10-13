import React from "react";
import { NavLink } from "react-router-dom";
import s from "./LandingPage.module.css";
import bone from "../assets/bone.png";

const LandingPage = () => {
	return (
		<div className={s.landing}>
			<NavLink to="/home">
				<img className={s.logo} src={bone} alt="enter"/>
			</NavLink>
			{/*<h1 className={s.h1}>Welcome!</h1>*/}
		</div>
	)
}

export default LandingPage;