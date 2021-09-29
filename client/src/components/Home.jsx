import React from "react";
import Card from "./Card.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllDogs, settingPage } from "../redux/actions/index.js";
import Search from "./Search.jsx";
import Order from "./Order.jsx";
import Filter from "./Filter.jsx";

const Home = () => {

	const dispatch = useDispatch();
	const { dogs, page, name, order } = useSelector(state => state);

	useEffect(() => {
		dispatch(getAllDogs({}))
	}, [dispatch])

	const changePage = (page) => {
		dispatch(getAllDogs({ name, page, order }))
		dispatch(settingPage(page))
	}

	return (

		<div>
			<Search />
			<Filter />
			<Order />
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
					dogs?.sliced?.length>0 && dogs.sliced.map((e) => {
						return <Card image={e.image} name={e.name} key={e.id} />
					})
				}
			</div>
		</div>
	)
}

export default Home;