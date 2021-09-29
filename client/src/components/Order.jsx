import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, settingOrder } from "../redux/actions";

const Order = () => {
	const { name, page } = useSelector(state => state);
	const dispatch = useDispatch();

	const handleOrder = (e) => {
		dispatch(settingOrder(e.target.value));
		dispatch(getAllDogs({ name, page, order: e.target.value }));
	}

	return (
		<div>
			<select defaultValue="" onChange={handleOrder}>
				<option value="asc">A - Z</option>
				<option value="desc">Z - A</option>
			</select>
			<select defaultValue="" onChange={handleOrder}>
				<option value="light">lightest first</option>
				<option value="heavy">heaviest first</option>
			</select>
		</div>
	)
}

export default Order;