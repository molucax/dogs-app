import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, settingOrder, settingPage } from "../../../redux/actions";
import s from "./Order.module.css";

const Order = () => {
	const { name, order, temperament, origin } = useSelector(state => state);
	const dispatch = useDispatch();

	const handleOrder = (e) => {
		const { value } = e.target;
		dispatch(settingOrder(value));
		dispatch(settingPage(1));
		dispatch(getAllDogs({ order: value, name, temperament, origin }));
	}

	return (
		<div className={s.orderContainer}>
			<h3>ORDER</h3>
			<select className={s.select} defaultValue="" onChange={handleOrder}>
				<option selected value="asc" key="asc">from A to Z</option>
				<option value="desc" key="desc">from Z to A</option>
				<option value="light" key="light">lightest first</option>
				<option value="heavy" key="heavy">heaviest first</option>
			</select>
		</div>
	)
}

export default Order;