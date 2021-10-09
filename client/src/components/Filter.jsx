import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTemperaments, getAllDogs, settingPage, settingTemperament, settingOrigin } from "../redux/actions";

const Filter = () => {

	const dispatch = useDispatch();
	const { temperaments, name, order, temperament, origin } = useSelector(state => state)
	
	useEffect(() => {
		dispatch(getTemperaments())
	}, [dispatch])

	const handleSelectTemperament = (e) => {
		dispatch(settingPage(1));
		dispatch(settingTemperament(e.target.value));
		dispatch(getAllDogs({ temperament: e.target.value, page: 1, name, order, origin }));
	} 

	const handleSelectOrigin = (e) => {
		dispatch(settingPage(1));
		dispatch(settingOrigin(e.target.value));
		dispatch(getAllDogs({ page: 1, name, order, temperament, origin: e.target.value}));
	}

	return (
		<div>
			<select value="" onChange={handleSelectTemperament}>
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
			<select value="" onChange={handleSelectOrigin}>
				<option value="" key="both">-both-</option>
				<option value="existent" key="existent">Existent</option>
				<option value="created" key="created">Created</option>
			</select> 
		</div>
	)

}

export default Filter;