import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getDog, removeDog, resetState } from "../redux/actions";
import s from "./Dog.module.css";
import pointer from "../assets/pointer.png";
import loading from "../assets/loading.gif";
import image from "../assets/dogdb.png";
import styled from "styled-components";

const Dog = (props) => {
  const { id } = props.match.params;
  const { dog } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDog(id));
    return () => {
      dispatch(removeDog());
    };
  }, [dispatch, id]);

  const handleClick = () => {
    history.goBack();
    dispatch(resetState());
  };

  let dogTemperaments = dog.temperament?.split(", ");

  return (
    <Wrapper>
      <PointerContainer>
        <Button onClick={handleClick}>{"<<<"}</Button>
        <img src={pointer} alt="back home" height="300px" width="450px" />
      </PointerContainer>
      <Right>
        {dog.name ? (
          <Loaded>
            <Top>
              <h1 className={s.p}>{dog.name.toUpperCase()}</h1>
            </Top>
            <Bottom>
              <ImgAndTemps>
                <Img
                  src={dog.fromDb ? image : dog.image?.url}
                  alt="img not found"
                />
                <Temperaments>
                  <T>Temperament:</T>
                  {dogTemperaments?.map((e) => {
                    return <TempItem key={e}>{e}</TempItem>;
                  })}
                </Temperaments>
              </ImgAndTemps>
              <HWLS>
                <InfoContainer>
                  <InfoTitle>Height:</InfoTitle>
                  <h3>{`${dog.weight} cm`}</h3>
                </InfoContainer>
                <InfoContainer>
                  <InfoTitle>Weight:</InfoTitle>
                  <h3>{`${dog.weight} kg`}</h3>
                </InfoContainer>
                <InfoContainer>
                  <InfoTitle>Life Span:</InfoTitle>
                  <h3>{dog.fromDb ? dog.ls : dog.life_span}</h3>
                </InfoContainer>
              </HWLS>
            </Bottom>
          </Loaded>
        ) : (
          <Loading>
            {!dog.error ? (
              <img
                src={loading}
                alt="Loading..."
                width="200px"
                height="120px"
              />
            ) : (
              <h1>Sorry, we couldn't find this dog.</h1>
            )}
          </Loading>
        )}
      </Right>
    </Wrapper>
  );
};

export default Dog;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  text-align: center;
  background-image: url("../assets/home.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
`;

const PointerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 50vw;
  padding-right: 10%;
`;

const Button = styled.button`
  width: 120px;
  height: 50px;
  background-color: black;
  color: white;
  font-size: x-large;
  border-radius: 7px;
  border-style: none;
`;

const Right = styled.div`
  background-color: rgba(14, 14, 14, 0.644);
  width: 50vw;
`;

const Loaded = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(136, 136, 136, 0.253);
  padding: 2%;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80vh;
`;

const ImgAndTemps = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Img = styled.img`
  height: 300px;
`;

const Temperaments = styled.div`
  text-align: center;
  background-color: rgba(136, 136, 136, 0.253);
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 15vw;
`;

const T = styled.h2`
  line-height: 0;
  margin-bottom: 10%;
  color: black;
`;

const TempItem = styled.h3`
  line-height: 0;
  color: white;
`;

const HWLS = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: rgba(136, 136, 136, 0.253);
  padding: 2%;
`;
const InfoContainer = styled.div`
  background-color: rgba(136, 136, 136, 0.253);
  margin: 20px;
  width: 30vw;
  color: white;
`;
const InfoTitle = styled.h2`
  color: black;
`;
const Loading = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 40%;
  justify-content: center;
  width: 50vw;
`;
