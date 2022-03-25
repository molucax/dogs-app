import React from 'react';
import styled from "styled-components";
import DogItem from './DogItem';
import dogimage from "../../assets/dogdb.png"

export default function DogList({dogs}) {
  return (
    <Wrapper>
      {
        dogs.sliced?.map(dog => <DogItem 
          image={dog.image ? dog.image : dogimage}
          name={dog.name}
          key={dog.id}
          id={dog.id}
          temperament={dog.temperament ? dog.temperament : "Unknown"}
          weight={dog.weight}
          height={dog.height}
        />)
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  margin: 0 .5rem;
`