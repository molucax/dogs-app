import React from "react";
import Card from "./Card.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllDogs, settingPage } from "../redux/actions/index.js";
import s from "./Home.module.css";
import Nav from "./Nav.jsx";
import img from "../assets/dogdb.png";

const Home = () => {

	const dispatch = useDispatch();
	const { dogs, page, name, order, temperament, origin } = useSelector(state => state);

	useEffect(() => {
		dispatch(getAllDogs({}))
	}, [dispatch])

	const changePage = (page) => {
		dispatch(settingPage(page))
		dispatch(getAllDogs({ name, order, temperament, origin }))
	}

	return (

		<div className={s.home}>
			<Nav />
			{/* ----------------- PAGINADO Y CARDS ------------------ */}
			<div className={s.rightContainer}>
			<div className={s.button}>
				<button
					disabled={page-1 === 0}
					onClick={ () => {changePage(page-1)}}
				>
					◀
				</button>
			</div>
			<div className={s.right}>
				<div className={s.pag}>
					<label>{page}</label>
				</div>
				<div className={s.mapdogs}>
					{	
						dogs?.sliced?.length ?
					 	dogs.sliced.map((e) => {
							return (
								<Card 
									image={e.image ? e.image : img}
									name={e.name} 
									key={e.id} 
									id={e.id} 
									temperament={e.temperament} 
									weight={e.weight}
								/>
							)
						})
						:
						<div>Loading...</div>
					}
				</div>
			</div>
			<div className={s.button}>
				<button
					disabled={dogs?.count <= (page * 8)}
					onClick={ () => {changePage(page+1)}}
				>
					▶
				</button>
			</div>
			</div>
		</div>
	)
}

export default Home;