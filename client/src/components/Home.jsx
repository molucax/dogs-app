import React from "react";
import Card from "./Card.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllDogs, settingPage } from "../redux/actions/index.js";

const Home = () => {

	const dispatch = useDispatch();
	const { dogs, page, name } = useSelector(state => state);

	useEffect(() => {
		dispatch(getAllDogs({}))
	}, [dispatch])

	const changePage = (page) => {
		dispatch(getAllDogs({ name, page }))
		dispatch(settingPage(page))
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
					dogs?.length>0 && dogs.map((e) => {
						return <Card image={e.image} name={e.name} key={e.id} />
					})
				}
			</div>
		</div>
	)
}

export default Home;