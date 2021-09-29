import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTemperaments, filterByTemperament } from "../redux/actions";

const Filter = () => {

	const dispatch = useDispatch();
	const { temperaments } = useSelector(state => state)
	
	useEffect(() => {
		dispatch(getTemperaments())
	}, [dispatch])

	const handleSelect = (e) => {
		dispatch(filterByTemperament(e.target.value))
	} 

	return (
		<div>
			<select value="" onChange={handleSelect}>
				{
					temperaments?.map(e => {
						let t = e.temperament ? e.temperament : "Unknown";
						return (
							<option value={t} key={t}>
								{t}
							</option>
						)
					})
				}
			</select>
		</div>
	)

}

export default Filter;