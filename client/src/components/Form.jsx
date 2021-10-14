import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getTemperaments, createDog } from "../redux/actions";
import s from "./Form.module.css";
import pointer from "../assets/pointer.png";

const Form = () => {
	const dispatch = useDispatch();
	const { temperaments } = useSelector(state => state)
	const history = useHistory();
 	
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

	const [errorName, setErrorName] = useState("");
	function validateName(value) {
		setFormulario({
			...formulario,
			name: value
		})
		if(!/^[a-zA-Z\s]*$/.test(value)) {
			setErrorName("letters, please");
		}
		else {
			setErrorName("");
		}
	}

	const [errorNum, setErrorNum] = useState("");
	function validateNum(e) {
		e.preventDefault();
		let { name, value } = e.target;
		if (name.slice(-3) === "min") { // acá entran los mínimos
			let max = name.slice(0, 1)
			max = max === "l" ? "lsmax" : `${max}max`
			if (Number(value) > Number(formulario[max])) {
				setErrorNum("minimum cannot be greater than maximum")
			}
			else {
				setErrorNum("");
			}
		}
		if (name.slice(-3) === "max") { // acá entran los máximos
			let min = name.slice(0, 1)
			min = min === "l" ? "lsmin" : `${min}min`
			if (Number(value) < Number(formulario[min])) {
				setErrorNum("maximum must be greater than minimum")
			}
			else {
				setErrorNum("");
			}
		}
		setFormulario({
			...formulario,
			[name]: value
		})
	}

	const handleChange = (e) => {
		e.preventDefault();
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
		alert("Breed created successfully!");
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
		history.push("/home");
	}

	const goBack = () => {
    	history.goBack();
    }

	let arrayT = formulario.temperaments.split(", ");

	return (
			<div className={s.formContainer}>
				<div className={s.left}>
					<button className={s.btn} onClick={goBack}>{"<<<"}</button>
					<img src={pointer} alt="back home" height="300px" width="450px"/>
				</div>
				<form className={s.form} onSubmit={onSubmit}>
					<div className={s.subContainer}>
						<h4>Breed's Name:</h4>
						<input
							className={s.input}
							value={formulario.name} 
							required={true}
							onChange={(e) => validateName(e.target.value)} 
							name="name" 
							type="text" 
						/>
						<div className={s.error}>
						{ !errorName ? null : <span>{errorName}</span> }
						</div>
					</div>
					<div className={s.subContainer}>
						<h4>Height (cm):</h4>
						<div className={s.mmContainer}>
							<div className={s.m}>
								<label>MIN</label>
								<input 
									className={s.input}
									value={formulario.hmin} 
									required={true}
									onChange={(e) => validateNum(e)} 
									min="1" 
									max="300" 
									name="hmin" 
									type="number" 
								/>
							</div>
							<div className={s.m}>
								<label>MAX</label>
								<input 
									className={s.input}
									value={formulario.hmax} 
									required={true}
									onChange={(e) => validateNum(e)} 
									min="1" 
									max="300" 
									name="hmax" 
									type="number" 
								/>
							</div>
						</div>
						<h4>Weight (kg):</h4>
						<div className={s.mmContainer}>
							<div className={s.m}>
								<label>MIN</label>
								<input 
									className={s.input}
									value={formulario.wmin} 
									required={true}
									onChange={(e) => validateNum(e)} 
									min="1" 
									max="300" 
									name="wmin" 
									type="number" 
								/>
							</div>
							<div className={s.m}>
								<label>MAX</label>
								<input 
									className={s.input}
									value={formulario.wmax} 
									required={true}
									onChange={(e) => validateNum(e)} 
									min="1" 
									max="300" 
									name="wmax" 
									type="number"
								/>
							</div>
						</div>
						<h4>Life Span (years):</h4>
						<div className={s.mmContainer}>
							<div className={s.m}>
								<label>MIN</label>
								<input 
									className={s.input}
									value={formulario.lsmin} 
									onChange={(e) => validateNum(e)} 
									min="1" 
									max="30" 
									name="lsmin" 
									type="number" 
								/>
							</div>
							<div className={s.m}>
								<label>MAX</label>
								<input 
									className={s.input}
									value={formulario.lsmax}
									onChange={(e) => validateNum(e)} 
									min="1" 
									max="30" 
									name="lsmax" 
									type="number" 
								/>
							</div>
						</div>
					</div>
					<div className={s.error}>
						{ !errorNum ? null : <span>{errorNum}</span> }
					</div>
					<div className={s.subContainer}>
						<h4>Temperaments:</h4>
						<select className={s.input} required={true} onChange={handleChange} name="temperaments">
							{
								temperaments?.map(e => (
									<option 
										key={e.temperament} 
										value={e.temperament}
									>
										{e.temperament}
									</option>
								))
							}
						</select>
					</div>
					<div>
						<input type="submit" value="Create"/>
					</div>
				</form>
				<div className={s.showTemperament}>
					<div className={s.pContainer}>
					{
						arrayT.map(e => {
							return (<h3 key={e} className={s.p}>{e}</h3>)
						})
					}
					</div>
				</div>
			</div>
	)
}

export default Form;