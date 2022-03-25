import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getDogBreeds, getTemperaments } from "../../redux/actions";
import DogList from "./DogList";
import LoadingScreen from "./LoadingScreen";
import PaginationButton from "./PaginationButton";
import bkg from "../../assets/dogh.jpg"

export default function NewHome() {
  const dispatch = useDispatch();
  const { dogs, page, name, temperament, origin, order } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getTemperaments())
    return () => dispatch({type: "OPEN_FILTERS", payload: false})
  }, [dispatch])

  useEffect(() => {
    dispatch(getDogBreeds({ name, temperament, origin, order }))
  }, [page, name, temperament, origin, order])



  if(dogs) {
    return (
      <Wrapper>
        <DogListContainer>
          <ButtonContainer>
            <PageContainer>
              <PageNumber>{page}</PageNumber>
            </PageContainer>
            <PreviousButton name="previous" />
          </ButtonContainer>
          <DogList dogs={dogs} />
          <ButtonContainer>
            <PageContainer>
            </PageContainer>
            <NextButton name="next" />
          </ButtonContainer>
        </DogListContainer>
      </Wrapper>
    );
  }
  else {
    return <LoadingScreen />
  }
}

const Wrapper = styled.div`
  width: 92%;
  height: 100%;
  /* background-image: url(${bkg});
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover; */
`;
const DogListContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const ButtonContainer = styled.div`
  height: 90%;
`
const PageContainer = styled.div`
  height: 10%;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;

`
const PageNumber = styled.span`
  font-size: 2rem;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.774);
  width: 3rem;
  text-align: center;
  color: lightgrey;
  border-radius: .2rem;
`

const PreviousButton = styled(PaginationButton)``;
const NextButton = styled(PreviousButton)``;



// #364968 azul grisaceo lindo