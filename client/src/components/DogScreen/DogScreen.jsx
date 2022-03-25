import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getDog } from "../../redux/actions";
import { Fade } from "react-reveal";
import LoadingScreen from "../NewHome/LoadingScreen";
import dogimage from "../../assets/dogdb.png"

export default function DogScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { dog } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getDog(id));
    return () => dispatch({ type: "SET_DOG", payload: null });
  }, [dispatch]);

  if (dog) {
    return (
      <Wrapper>
        <Container>
          <Top>
            <Fade>
              <Name>{dog.name}</Name>
            </Fade>
          </Top>
          <Middle>
            <SubMiddle>
              <Fade>
                <Label>Weight:</Label>
                <Data>{dog.weight} kg</Data>
              </Fade>
            </SubMiddle>
            <SubMiddle>
              <Fade>
                <Label>Height:</Label>
                <Data>{dog.height} cm</Data>
              </Fade>
            </SubMiddle>
            <SubMiddle>
              <Fade>
                <Label>Life Span:</Label>
                <Data>{dog.life_span}</Data>
              </Fade>
            </SubMiddle>
          </Middle>
          <Bottom>
            <BottomLeft>
              <UnorderedList>
                {dog.temperament.split(", ").map((temp) => (
                  <ListItem key={temp}>
                    <Fade>{temp}</Fade>
                  </ListItem>
                ))}
              </UnorderedList>
            </BottomLeft>
            <BottomRight>
              {/* <ImgContainer> */}
              <Fade>
              <Img src={dog.image.url ? dog.image.url : dogimage} alt={dog.name} />
              </Fade>
              {/*  </ImgContainer> */}
            </BottomRight>
          </Bottom>
        </Container>
      </Wrapper>
    );
  } else return <LoadingScreen />;
}

const Wrapper = styled.div`
  width: 92%;
  height: 100%;
  color: lightgrey;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border-left: solid rgba(0, 0, 0, 0.884) 2rem;
  border-right: solid rgba(0, 0, 0, 0.884) 2rem; */
`;
const Container = styled.div`
  width: 85%;
  height: 100%;
  background: rgba(26, 26, 26, 0.76);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-left: solid rgba(0, 0, 0, 0.884) 1rem;
  border-right: solid rgba(0, 0, 0, 0.884) 1rem;
`;
const Top = styled.div`
  width: 100%;
  height: 15%;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.884);
`;
const Name = styled.span`
  font-size: 3rem;
  font-weight: bold;
`;

const Middle = styled.div`
  width: 85%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubMiddle = styled.div`
  width: 25%;
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #1d2636c2;
`;
const Label = styled.span`
  font-size: 1.7rem;
  font-weight: bold;
  margin-bottom: 10px;
`;
const Data = styled.span`
  font-size: 1.5rem;
`;
const Bottom = styled.div`
  height: 65%;
  width: 85%;
  display: flex;
  justify-content: space-between;
`;

const BottomLeft = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const BottomRight = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-right: 1.1rem;
  padding-bottom: 1.1rem;
  overflow-x: hidden;
`;
const TemperamentContainer = styled.div`
  width: 70%;
  background: #1d2636c2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const Img = styled.img`
  height: 100%;
`;

const UnorderedList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  font-size: 1.5rem;
`;

const ListItem = styled.li`
  background: #1d2636c2;
  width: 60%;
  text-align: center;
  padding: 0;
  &:first-child {
    padding-top: 1rem;
  }
  &:last-child {
    padding-bottom: 1rem;
  }
`;
