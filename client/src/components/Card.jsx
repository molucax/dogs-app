import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`

`

const Card = ({ image, name, temperament, weight, id, fromDb }) => {
	return (
		<CardContainer>
			<img src={image} alt={name} />
			<NavLink to={`/dog/${id}`}>{name}</NavLink>
			<p>{`${weight} kg`}</p>
			<p>{temperament}</p>
		</CardContainer>
	)
}

export default Card;