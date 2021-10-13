import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Card.module.css";

const Card = ({ image, name, temperament, weight, id }) => {
	let dogTemperaments = temperament?.split(", ");
	return (
		// ----- VERTICAL -----
		
		<NavLink className={s.card} to={`dog/${id}`}>
			{/*DIV 1*/}
			<div className={s.nameContainer}>
				<p className={s.name}>{name.toUpperCase()}</p>
			</div>

			{/*DIV 2*/}
			<div className={s.cardElements}>
				<div className={s.weightDiv}>
					<p className={s.weight}>{`${weight} kg`}</p>
				</div>
				<div className={s.imgDiv}>
					<img className={s.img} src={image} alt={name}/>
				</div>
				<div className={s.temperamentsDiv}>
					<div className={s.temperaments}>
					{ 
						dogTemperaments?.map(t => {
							return <li className={s.li} key={t}>{t}</li>
						})
					}
					</div>
				</div>
			</div>
		</NavLink>
	)
}

export default Card;