import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, settingOrder, settingPage } from "../redux/actions";

const Order = () => {
	const { name, temperament, origin } = useSelector(state => state);
	const dispatch = useDispatch();

	const handleOrder = (e) => {
		dispatch(settingOrder(e.target.value));
		dispatch(settingPage(1));
		dispatch(getAllDogs({ order: e.target.value, name, temperament, origin }));
	}

	return (
		<div>
			<select defaultValue="" onChange={handleOrder}>
				<option selected value="" key="order">ORDER</option>
				<option value="asc" key="asc">from A to Z</option>
				<option value="desc" key="desc">from Z to A</option>
				<option value="light" key="light">lightest first</option>
				<option value="heavy" key="heavy">heaviest first</option>
			</select>
		</div>
	)
}

export default Order;