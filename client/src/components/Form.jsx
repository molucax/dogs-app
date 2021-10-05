import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, createDog } from "../redux/actions";

const Form = () => {
	const dispatch = useDispatch();
	const { temperaments } = useSelector(state => state)

	useEffect(() => {
		dispatch(getTemperaments())
	}, [dispatch])

	const [formulario, setFormulario] = useState({
		name: "",
		hmin: "",
		hmax: "",
		wmin: "",
		wmax: "",
		lsmin: "",
		lsmax: "",
		temperaments: "",
	})

	const handleChange = (e) => {
		let { name, value } = e.target;
		if (name === "temperaments" && formulario.temperaments !== ""){
			setFormulario({
				...formulario,
				temperaments: `${formulario.temperaments}, ${value}`
			})
		}
		else {
			setFormulario({
				...formulario,
				[name]: value
			})
		}
	}

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(createDog(formulario))
		setFormulario({
			name: "",
			hmin: "",
			hmax: "",
			wmin: "",
			wmax: "",
			lsmin: "",
			lsmax: "",
			temperaments: "",
		})
	}

	return (
		<form onSubmit={onSubmit}>
			<h4>Breed's Name:</h4>
			<input value={formulario.name} onChange={handleChange} name="name" type="text" />
			<div>
				<h4>Height:</h4>
				<label>MIN</label>
				<input value={formulario.hmin} onChange={handleChange} name="hmin" type="number" />
				<label>MAX</label>
				<input value={formulario.hmax} onChange={handleChange} name="hmax" type="number" />
			</div>
			<div>
				<h4>Weight:</h4>
				<label>MIN</label>
				<input value={formulario.wmin} onChange={handleChange} name="wmin" type="number" />
				<label>MAX</label>
				<input value={formulario.wmax} onChange={handleChange} name="wmax" type="number" />
			</div>
			<h4>Life Span:</h4>
			<label>MIN</label>
			<input value={formulario.lsmin} onChange={handleChange} name="lsmin" type="number" />
			<label>MAX</label>
			<input value={formulario.lsmax} onChange={handleChange} name="lsmax" type="number" />
			
			<h4>Temperaments:</h4>
			<select onChange={handleChange} name="temperaments">
				{
					temperaments?.map(e => (
						<option key={e.temperament} value={e.temperament}>{e.temperament}</option>
					))
				}
			</select>
			<input type="submit" value="Create"/>
		</form>
	)
}

export default Form;