import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, createDog } from "../redux/actions";

const Form = () => {
	const dispatch = useDispatch();
	const { temperaments } = useSelector(state => state)

	useEffect(() => {
		dispatch(getTemperaments())
	}, [dispatch])

	const [height, setHeight] = useState({
		min: "",
		max: "",
	})
	const [weight, setWeight] = useState({
		min: "",
		max: "",
	})
	const [ls, setLs] = useState({
		min: "",
		max: "",
	})

	const handleHeight = (e) => {
		setHeight({
			...height,
			[e.target.name]: e.target.value
		})
	}

	const handleWeight = (e) => {
		setWeight({
			...weight,
			[e.target.name]: e.target.value
		})
	}

	const handleLs = (e) => {
		setLs({
			...ls,
			[e.target.name]: e.target.value
		})
	}

	const [formulario, setFormulario] = useState({
		name: "",
		height: "",
		weight: "",
		ls: "",
		temperaments: "",
	})
	const handleChange = (e) => {
		const { name, value } = e.target
		if (name === "temperaments" && formulario.temperaments !== "") {
			setFormulario({
				...formulario,
				"temperaments": `${formulario.temperaments}, ${value}`
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
		setFormulario({
			...formulario,
			height: `${height.min} - ${height.max}`,
			weight: `${weight.min} - ${weight.max}`,
			ls: `${ls.min} - ${ls.max} years`,
		})
		dispatch(createDog(formulario))
		setFormulario({
			name: "",
			height: "",
			weight: "",
			ls: "",
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
				<input value={height.min} onChange={handleHeight} name="min" type="number" />
				<label>MAX</label>
				<input value={height.max} onChange={handleHeight} name="max" type="number" />
			</div>
			<div>
				<h4>Weight:</h4>
				<label>MIN</label>
				<input value={weight.min} onChange={handleWeight} name="min" type="number" />
				<label>MAX</label>
				<input value={weight.max} onChange={handleWeight} name="max" type="number" />
			</div>
			<h4>Life Span:</h4>
			<label>MIN</label>
			<input value={ls.min} onChange={handleLs} name="min" type="number" />
			<label>MAX</label>
			<input value={ls.max} onChange={handleLs} name="max" type="number" />
			
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