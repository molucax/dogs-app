import React from "react";
import { NavLink } from "react-router-dom";

const Card = ({ image, name, id }) => {
	return (
		<div>
			<img src={image} alt={name} />
			<NavLink to={`/dog/${id}`}>{name}</NavLink>
		</div>
	)
}

export default Card;