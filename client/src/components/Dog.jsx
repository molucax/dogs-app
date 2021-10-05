import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getDog, removeDog } from "../redux/actions";

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

	return (
		<div>
			<button onClick={goBack}>BACK</button>
			{
				dog?.name ?
				<div>
					<img src={dog.image.url} alt="img not found"/>
					<p>{dog.name}</p>
				</div>
				:
				<div>Loading...</div>
			}
		</div>
	)
}

export default Dog;