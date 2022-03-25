import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getDogBreeds, settingPage } from "../../redux/actions";

export default function PaginationButton({ name }) {
  const dispatch = useDispatch();
  const { dogs, page, order, temperament, origin } = useSelector((state) => state);

  function handleClick() {
    let newPage = name === "previous" ? page - 1 : page + 1;
    dispatch(settingPage(newPage));
  }

  return (
    <Wrapper justify={name === "previous" ? "flex-end" : "flex-start"}>
      <Button
        onClick={handleClick}
        disabled={
          name === "previous" ? page - 1 === 0 : dogs?.count <= page * 8
        }
      >
        {name === "previous" ? "◀" : "▶"}
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 8rem;
  height: 100%;
  background: transparent;
  display: flex;
  justify-content: ${(props) => props.justify};
  align-items: center;
  /*  background: grey; */
`;

const Button = styled.button`
  width: 5rem;
  height: 5rem;
  font-size: 2rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.774);
  color: lightgrey;
  border-style: none;
  visibility: ${(props) => (props.disabled ? "hidden" : undefined)};
  &:hover {
    color: ${(props) => (props.disabled ? undefined : "white")};
    background: ${(props) => (props.disabled ? undefined : "black")};
  }
  padding-bottom: 5px;
`;
