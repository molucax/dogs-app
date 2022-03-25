import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { GiDogHouse } from "react-icons/gi";
import {
  BsFolderPlus,
  BsFilterCircle,
  BsFilterCircleFill,
} from "react-icons/bs";
import Filters from "./Filters";
import { Link } from "react-router-dom";

export default function Navbar() {

  const dispatch = useDispatch();
  const { filters } = useSelector(state => state)
  const location = useLocation();

  return (
    <Wrapper>
      <Icons>
        <IconContainer title="Home">
          <Link to="/home">
            <GiDogHouse color="white" size="90%" />
          </Link>
        </IconContainer>
        <IconContainer title="Create a Breed">
          <Link to="/create">
            <BsFolderPlus color="white" size="85%" />
          </Link>
        </IconContainer>
        {location.pathname.includes("home") ? (
          <IconContainer
            title="Filters"
            onClick={() => dispatch({type: "OPEN_FILTERS", payload: !filters})}
          >
            {filters ? (
              <BsFilterCircleFill color="white" size="85%" />
            ) : (
              <BsFilterCircle color="white" size="85%" />
            )}
          </IconContainer>
        ) : null }
      </Icons>
      <FiltersContainer visibility={!filters ? "hidden" : undefined}>
        <Filters />
      </FiltersContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.63);
  width: 8%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Icons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40%;
`;
const FiltersContainer = styled.div`
  height: 60%;
  visibility: ${(props) => props.visibility};
`;
const IconContainer = styled.div`
  cursor: pointer;
`;
