import React from "react";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
	return (
		<div>
			Landing Page
			<NavLink to="/home">
				<button>ENTER</button>
			</NavLink>
		</div>
	)
}

export default LandingPage;