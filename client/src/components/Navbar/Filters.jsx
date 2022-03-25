import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { BiReset } from "react-icons/bi";
import { settingName, settingOrder, settingOrigin, settingPage, settingTemperament } from "../../redux/actions";

export default function Filters() {
  const { temperaments, origin, order } = useSelector((state) => state);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  function handleSelect(e) {
    dispatch(settingTemperament(e.target.value))
  }

  function handleRadioInput (e) {
    if(e.target.name === "origin") {
      dispatch(settingOrigin(e.target.id))
      dispatch(settingPage(1))
    }
    if(e.target.name === "order") {
      dispatch(settingOrder(e.target.id))
      dispatch(settingPage(1))
    }
  }

  function handleReset() {
    dispatch(settingOrigin(""))
    dispatch(settingOrder(""))
    dispatch(settingPage(1))
  }

  function handleChange(e) {
    setInput(e.target.value)
    dispatch(settingPage(1))
    setTimeout(() => dispatch(settingName(e.target.value)), 500)
  }

  return (
    <Wrapper>
      <SearchBar>
        <SearchInput
          placeholder="Search by name"
          type="text"
          value={input}
          onChange={handleChange}
        />
        {/* <SearchButton>
          <BiSearchAlt type="submit" color="white" size="26" />
        </SearchButton> */}
      </SearchBar>
      <FiltersContainer>
        <SingleFilterContainer>
          <FilterTitle>Filter</FilterTitle>
          <OptionsContainer>
            <Select
              name="temperaments"
              id="temperaments"
              onChange={handleSelect}
            >
              <option style={{textAlign: "center"}} selected value="">
               - show all -
              </option>
              {temperaments?.map((e) => (
                <option key={e.temperament} value={e.temperament}>{e.temperament}</option>
              ))}
            </Select>
          </OptionsContainer>
          <OptionsContainer>
            <LabelInput>
              <label for="existent">Existent</label>
              <RadioInput 
                onChange={handleRadioInput} 
                type="radio" 
                id="existent" 
                name="origin" 
                checked={origin === "existent"} 
              />
            </LabelInput>
            <LabelInput>
              <label for="created">Created</label>
              <RadioInput 
                onChange={handleRadioInput} 
                type="radio" 
                id="created" 
                name="origin" 
                checked={origin === "created"} 
              />
            </LabelInput>
          </OptionsContainer>
        </SingleFilterContainer>
        <SingleFilterContainer>
          <FilterTitle>Sort</FilterTitle>
          <OptionsContainer>
            <LabelInput>
              <label for="order">A - Z</label>
              <RadioInput 
                onChange={handleRadioInput}
                type="radio" 
                id="asc" 
                name="order"
                checked={order === "asc"} 
              />
            </LabelInput>
            <LabelInput>
              <label for="order">Z - A</label>
              <RadioInput
                onChange={handleRadioInput}
                type="radio" 
                id="desc" 
                name="order"
                checked={order === "desc"} 
              />
            </LabelInput>
          </OptionsContainer>
          <OptionsContainer style={{ marginTop: "1rem" }}>
            <LabelInput>
              <label for="order">Min Weight</label>
              <RadioInput
                onChange={handleRadioInput}
                type="radio" 
                id="light" 
                name="order"
                checked={order === "light"} 
              />
            </LabelInput>
            <LabelInput>
              <label for="order">Max Weight</label>
              <RadioInput
                onChange={handleRadioInput}
                type="radio" 
                id="heavy" 
                name="order"
                checked={order === "heavy"}
              />
            </LabelInput>
          </OptionsContainer>
        </SingleFilterContainer>
      </FiltersContainer>
        <ResetContainer>
          <ResetButton onClick={handleReset}>
            <BiReset size="30" color="white" />
          </ResetButton>
        </ResetContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 1rem;
  width: 18vw;
  height: 53%;
  background: black;
  z-index: 2;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  border-radius: .5rem;
`;

const ResetContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`
const ResetButton = styled.button`
background: none;
border-style: none;
cursor: pointer;
`

const RadioInput = styled.input`
  background: #2c2e33;
  accent-color: #4b74db;
	width: 15px;
	height: 15px;
  cursor: pointer;
`
const Select = styled.select`
  width: 60%;
  background: #2c2e33;
  border-style: none;
  border-radius: .4rem;
  color: lightgrey;
  height: 1.5rem;
`;
const SearchBar = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SearchInput = styled.input`
  width: 100%;
  height: 1.5rem;
  font-size: 1.1rem;
  background: #2c2e33;
  border-style: none;
  border-radius: .4rem;
  color: lightgrey;
  padding: .3rem;
  text-align: center;
`;
const SearchButton = styled.button`
  background: none;
  border-style: none;
  cursor: pointer;
`;
const FiltersContainer = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const SingleFilterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const OptionsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 0.5rem;
`;

const FilterTitle = styled.span`
  font-size: 1.3rem;
  font-weight: bold;
`;
const LabelInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: lightgrey;
`;
