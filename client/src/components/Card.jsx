import React from "react";
import { NavLink } from "react-router-dom";

const Card = ({ image, name, temperament, weight, id, fromDb }) => {
	return (
		<div>
			<img src={image} alt={name} />
			<NavLink to={`/dog/${id}`}>{name}</NavLink>
			<p>{`${weight} kg`}</p>
			<p>{temperament}</p>
		</div>
	)
}

export default Card;