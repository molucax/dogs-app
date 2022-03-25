import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTemperaments, createDog } from "../../redux/actions";
import styled from "styled-components";

const Form = () => {
  const dispatch = useDispatch();
  const { temperaments } = useSelector((state) => state);
  const history = useHistory();

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const [formulario, setFormulario] = useState({
    name: "",
    hmin: "",
    hmax: "",
    wmin: "",
    wmax: "",
    lsmin: "",
    lsmax: "",
    temperaments: "",
  });

  const [errorName, setErrorName] = useState("");
  function validateName(value) {
    setFormulario({
      ...formulario,
      name: value,
    });
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      setErrorName("letters, please");
    } else {
      setErrorName("");
    }
  }

  const [errorNum, setErrorNum] = useState("");
  function validateNum(e) {
    e.preventDefault();
    let { name, value } = e.target;
    if (name.slice(-3) === "min") {
      // acá entran los mínimos
      let max = name.slice(0, 1);
      max = max === "l" ? "lsmax" : `${max}max`;
      if (Number(value) > Number(formulario[max])) {
        setErrorNum("minimum cannot be greater than maximum");
      } else {
        setErrorNum("");
      }
    }
    if (name.slice(-3) === "max") {
      // acá entran los máximos
      let min = name.slice(0, 1);
      min = min === "l" ? "lsmin" : `${min}min`;
      if (Number(value) < Number(formulario[min])) {
        setErrorNum("maximum must be greater than minimum");
      } else {
        setErrorNum("");
      }
    }
    setFormulario({
      ...formulario,
      [name]: value,
    });
  }

  const handleChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    if (name === "temperaments" && formulario.temperaments !== "") {
      setFormulario({
        ...formulario,
        temperaments: `${formulario.temperaments}, ${value}`,
      });
    } else {
      setFormulario({
        ...formulario,
        [name]: value,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createDog(formulario));
    alert("Breed created successfully!");
    setFormulario({
      name: "",
      hmin: "",
      hmax: "",
      wmin: "",
      wmax: "",
      lsmin: "",
      lsmax: "",
      temperaments: "",
    });
    history.push("/home");
  };

  const goBack = () => {
    history.goBack();
  };

  let arrayT = formulario.temperaments.split(", ");

  return (
    <Wrapper>
      <FormElement onSubmit={onSubmit}>
        <Left>
          <Container>
            <Title>Name:</Title>
            <InputName
              value={formulario.name}
              required={true}
              onChange={(e) => validateName(e.target.value)}
              name="name"
              type="text"
            />
          </Container>
           <div>
          <Create type="submit" value="DONE" />
        </div>
        </Left>
        <Middle>
          <SelectContainer>
            <Title>Temperament:</Title>
            <Select required={true} onChange={handleChange} name="temperaments">
              {temperaments?.map((e) => (
                <option key={e.temperament} value={e.temperament}>
                  {e.temperament}
                </option>
              ))}
            </Select>
          </SelectContainer>
          <SelectedTemperaments>
            {" "}
            {arrayT.map((e) => {
              if (e) {
                return (
                  <Item>
                    <NewTemp key={e}>{e}</NewTemp>
                    <ButtonX>X</ButtonX>
                  </Item>
                );
              }
            })}
          </SelectedTemperaments>
        </Middle>
        {/*         <Subcontainer>
          <Title>Name:</Title>
          <InputName
            value={formulario.name}
            required={true}
            onChange={(e) => validateName(e.target.value)}
            name="name"
            type="text"
          />
          <ErrorContainer>
            {!errorName ? null : <span>{errorName}</span>}
          </ErrorContainer>
        </Subcontainer>
        <Subcontainer>
          <h4>Height (cm):</h4> */}
        <Right>
          <Container>
            <Title>{"Height (cm):"}</Title>
            <MMContainer>
              <M>
                <Label>MIN</Label>
                <Input
                  value={formulario.hmin}
                  required={true}
                  onChange={(e) => validateNum(e)}
                  min="1"
                  max="300"
                  name="hmin"
                  type="number"
                />
              </M>
              <M>
                <Label>MAX</Label>
                <Input
                  value={formulario.hmax}
                  required={true}
                  onChange={(e) => validateNum(e)}
                  min="1"
                  max="300"
                  name="hmax"
                  type="number"
                />
              </M>
            </MMContainer>
          </Container>
          <Container>
            <Title>{"Weight (kg):"}</Title>
            <MMContainer>
              <M>
                <Label>MIN</Label>
                <Input
                  value={formulario.wmin}
                  required={true}
                  onChange={(e) => validateNum(e)}
                  min="1"
                  max="300"
                  name="wmin"
                  type="number"
                />
              </M>
              <M>
                <Label>MAX</Label>
                <Input
                  value={formulario.wmax}
                  required={true}
                  onChange={(e) => validateNum(e)}
                  min="1"
                  max="300"
                  name="wmax"
                  type="number"
                />
              </M>
            </MMContainer>
          </Container>
          <Container>
            <Title>{"Life Span (years):"}</Title>
            <MMContainer>
              <M>
                <Label>MIN</Label>
                <Input
                  value={formulario.lsmin}
                  onChange={(e) => validateNum(e)}
                  min="1"
                  max="30"
                  name="lsmin"
                  type="number"
                />
              </M>
              <M>
                <Label>MAX</Label>
                <Input
                  value={formulario.lsmax}
                  onChange={(e) => validateNum(e)}
                  min="1"
                  max="30"
                  name="lsmax"
                  type="number"
                />
              </M>
            </MMContainer>
          </Container>
        </Right>
        {/*  </Subcontainer>
        <ErrorContainer>
          {!errorNum ? null : <span>{errorNum}</span>}
        </ErrorContainer>
        
        <div>
          <Create type="submit" value="Create" />
        </div> */}
      </FormElement>
    </Wrapper>
  );
};

export default Form;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  text-align: center;
  color: lightgrey;
  font-size: 1.3rem;
`;
const Left = styled.div`
  width: 30%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Middle = styled.div`
  height: 70%;
  width: 25%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Right = styled.div`
  width: 30%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background: rgba(17, 17, 17, 0.411);
`;

const Button = styled.button`
  border-radius: 7px;
  border-style: none;
`;
const Item = styled.div`
  display: flex;
  background: black;
  align-items: center;
  padding: 0.3rem;
  margin: 0.1rem;
  border-radius: 3px;
`;
const ButtonX = styled.button`
  height: 23px;
  width: 23px;
  border-radius: 3px;
  background: none;
  border-style: none;
  color: white;
  &:hover {
    background: red;
  }
`;
const FormElement = styled.form`
  width: 100%;
  margin: 1.5rem;
  background: rgba(26, 26, 26, 0.76);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const Subcontainer = styled.div``;
const Input = styled.input`
  width: 50px;
  height: 30px;
  font-size: 1.5rem;
  background: rgba(128, 128, 128, 0.63);
  color: black;
  border-style: none;
  border-radius: 3px;
`;
const InputName = styled(Input)`
  width: 87%;
  margin: 1.2rem 0;
`;
const Select = styled.select`
  width: 150px;
  height: 30px;
  font-size: 1.3rem;
  background: rgba(128, 128, 128, 0.63);
  color: black;
  border-style: none;
  border-radius: 3px;
  margin: 0.5rem 0;
`;
const ErrorContainer = styled.div`
  color: rgb(246, 80, 80);
`;
const MMContainer = styled.div`
  display: flex;
  width: 200px;
  justify-content: center;
  padding: 0.7rem;
`;
const M = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
`;
const Create = styled.input`
  background-color: grey;
  color: black;
  font-size: large;
  border-radius: 4px;
  border-style: none;
  padding: 1.4rem;
  font-size: 1.3rem;
  font-weight: bold;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    background: white;
    font-size: 1.5rem;
  }
`;
const ShowTemperament = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const SelectedTemperaments = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y: scroll;
  height: 100vh;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background: rgba(17, 17, 17, 0.411);
`;
const NewTemp = styled.span`
  font-size: 1.1rem;
  padding-right: 0.5rem;
`;

const Label = styled.span``;

const Title = styled.span`
  font-weight: bold;
  padding: 0.7rem 0;
  background: black;
  width: 100%;
`;

const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(17, 17, 17, 0.6);
`;
