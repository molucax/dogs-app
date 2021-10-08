import React from "react";
import Card from "./Card.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllDogs, settingPage } from "../redux/actions/index.js";
import Nav from "./Nav.jsx";

const Home = () => {

	const dispatch = useDispatch();
	const { dogs, page, name, order, temperament, origin } = useSelector(state => state);

	useEffect(() => {
		dispatch(getAllDogs({}))
	}, [dispatch])

	const changePage = (page) => {
		dispatch(settingPage(page))
		dispatch(getAllDogs({ name, page, order, temperament, origin }))
	}

	return (

		<div>
			{/* ----------------- PAGINADO Y CARDS ------------------ */}
			<div>
				<button
					disabled={page-1 === 0}
					onClick={ () => {changePage(page-1)}}
				>
					◀◀◀
				</button>
				<label>{page}</label>
				<button
					disabled={dogs?.count <= (page * 8)}
					onClick={ () => {changePage(page+1)}}
				>
					▶▶▶
				</button>
			</div>
			<div>
				{	
					dogs?.sliced?.length ?
				 	dogs.sliced.map((e) => {
				 		let t;
				 		if (e.fromDb) {
				 			t = e.Temperaments.map(e => e.temperament)
				 			t = t.join(", ");
				 		}
				 		else{
				 			t = e.temperament;
				 		}
						return (
							<Card 
								image={e.image}
								name={e.name} 
								key={e.id} 
								id={e.id} 
								temperament={t} 
								weight={e.weight}
							/>
						)
					})
					:
					<div>Loading...</div>
				}
			</div>
		</div>
	)
}

export default Home;