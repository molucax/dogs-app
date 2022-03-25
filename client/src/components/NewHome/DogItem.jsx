import React from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom"

export default function DogItem({image, name, id, temperament, weight, height }) {

  const history = useHistory()

  return (
    <Wrapper onClick={() => history.push(`/dog/${id}`)}>
      <Card>
        <Top>
          <h1>{name}</h1>
        </Top>
        <Bottom>
          <BottomLeft>
            <Info>
              <InfoLabel>Weight:</InfoLabel>
              <Span>{weight} kg</Span>
            </Info>
            <UnorderedList>
            {
              temperament.split(", ").map(str => <ListItem key={str}>{str}</ListItem>)
            }
            </UnorderedList>
          </BottomLeft>
          <ImgContainer>
            <Img src={image} alt={name} />
          </ImgContainer>
        </Bottom>
      </Card>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 80%;
  color: lightgrey;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    width: 90%;
  }
`

const Card = styled.div`
  background: rgba(17, 17, 17, 0.301);
  width: 100%;
  border-left: solid rgba(0, 0, 0, 0.884) 1rem;
  border-right: solid rgba(0, 0, 0, 0.884) 1rem;
`

const UnorderedList = styled.ul`
  list-style-type: none;
  background: #1d2636c2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem 0;
`
const ListItem = styled.li`
  font-size: 1.2rem;
`
const Top = styled.div`
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.884);
`
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  height: auto;
  width: 100%;
`

const BottomLeft = styled.div`
  display: flex;
  width: 30%;
  height: auto;
  flex-direction: column;
`

const ImgContainer = styled.div`
 width: 50%;
  display: flex;
  overflow: hidden;
  align-items: flex-start;
  justify-content: flex-end;
  padding-top: 1rem;
`
const Img = styled.img`
  object-fit: scale-down;
  width: 100%;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: space-evenly;
  background: green;
  width: 50%;
  align-items: center;
`
const Info = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
  background: blue;
  margin-top: 1rem;
  background: #1d2636c2;
  padding: 2rem;
`

const InfoLabel = styled.span`
  font-size: 1.3rem;
  font-weight: bold;
`

const Span = styled.span`
  font-size: 1.2rem;
`