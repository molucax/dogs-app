import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTemperaments, getAllDogs, settingPage, settingTemperament, settingOrigin } from "../redux/actions";
import s from "./Filter.module.css";

const Filter = () => {

	const dispatch = useDispatch();
	const { temperaments, name, order, temperament, origin } = useSelector(state => state)
	
	useEffect(() => {
		dispatch(getTemperaments())
	}, [dispatch])

	const handleSelectTemperament = (e) => {
		dispatch(settingPage(1));
		dispatch(settingTemperament(e.target.value));
		dispatch(getAllDogs({ temperament: e.target.value, name, order, origin }));
	} 

	const handleSelectOrigin = (e) => {
		dispatch(settingPage(1));
		dispatch(settingOrigin(e.target.value));
		dispatch(getAllDogs({ origin: e.target.value, name, order, temperament }));
	}

	const handleBtnOrigin = () => {
		dispatch(settingOrigin(""));
		dispatch(settingPage(1));
		dispatch(getAllDogs({ origin: "", name, order, temperament}))
	}
	const handleBtnTemperament = () => {
		dispatch(settingTemperament(""));
		dispatch(settingPage(1));
		dispatch(getAllDogs({ temperament: "", origin, name, order }))
	}

	return (
		<div className={s.filterContainer}>
			<h3>FILTER</h3>
			<div className={s.filtersRow}>
				<div className={s.eachFilter}>
					<select className={s.select} value="" onChange={handleSelectTemperament}>
						<option selected value="" key="temperament">- temperament -</option>
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
					<div className={s.showFilter}>
						{ temperament ? <p className={s.p}>{temperament.toLowerCase()}</p> : null }
						{ temperament ? <button className={s.btnX} onClick={handleBtnTemperament}>X</button> : null }
					</div>
				</div>
				<div className={s.eachFilter}>
					<select className={s.select} value="" onChange={handleSelectOrigin}>
						<option selected value="" key="origin">- origin -</option>
						<option value="existent" key="existent">Existent</option>
						<option value="created" key="created">Created</option>
					</select> 
					<div className={s.showFilter}>
						{ origin ? <p className={s.p}>{origin}</p> : null }
						{ origin ? <button className={s.btnX} onClick={handleBtnOrigin}>X</button> : null }
					</div>
				</div>
			</div>
		</div>
	)

}

export default Filter;