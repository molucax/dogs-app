import React from "react";
import { NavLink } from "react-router-dom";
import s from "./LandingPage.module.css";

const LandingPage = () => {
	return (
		<div className={s.landing}>
			Landing Page
			<NavLink to="/home">
				<button>ENTER</button>
			</NavLink>
		</div>
	)
}

export default LandingPage;