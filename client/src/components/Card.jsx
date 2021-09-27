import React from "react";

const Card = ({ image, name }) => {
	return (
		<div>
			<img src={image} alt={name} />
			<h3>{name}</h3>
		</div>
	)
}

export default Card;