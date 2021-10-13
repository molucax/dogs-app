import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getDog, removeDog } from "../redux/actions";
import s from "./Dog.module.css";

const Dog = (props) => {
	const { id } = props.match.params;
	const { dog } = useSelector(state => state);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(()=>{
        dispatch(getDog(id))
        return () => {
            dispatch(removeDog())
        }
    },[dispatch,id])

    const goBack = () => {
    	history.goBack();
    }

    let dogTemperaments = dog.temperament?.split(", ")

	return (
		<div className={s.container}> {/*row*/}
			<div className={s.left}>
				<button className={s.btn} onClick={goBack}>BACK</button>
			</div>
			<div className={s.right}>
				{
					dog ?
					<div className={s.loaded}>
						<div className={s.rTop}>
							<h1 className={s.p}>{dog.name}</h1>
						</div>
						<div className={s.rBottom}>
							<div className={s.imgTemps}>
								<img className={s.img} src={dog.fromDb ? dog.image : dog.image?.url} alt="img not found"/>
								<div className={s.temperaments}>
									<h2 className={s.t}>Temperament:</h2>
									{
										dogTemperaments?.map(e => {
											return (<h3 className={s.p} key={e}>{e}</h3>)
										})
									}
								</div>
							</div>
							<div className={s.hwls}>
								<div className={s.height}>
									<h2 className={s.info}>Height:</h2>
									<h3>{`${dog.height} cm`}</h3>
								</div>
								<div className={s.height}>
									<h2 className={s.info}>Weight:</h2>
									<h3>{`${dog.weight} kg`}</h3>
								</div>	
								<div className={s.height}>
									<h2 className={s.info}>Life Span:</h2>
									<h3>{dog.life_span}</h3>
								</div>
							</div>
						</div>
					</div>
					:
					<div className={s.loading}>Loading...</div>
				}
			</div>
		</div>
	)
}

export default Dog;