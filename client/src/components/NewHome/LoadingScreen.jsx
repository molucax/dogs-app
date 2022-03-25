import React from 'react'
import styled from "styled-components"
import runningDog from "../../assets/loading.gif";

export default function LoadingScreen() {
  return (
    <Wrapper>
      <img height="200px" src={runningDog} alt="Loading..." />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  width: 92%;
  display: flex;
  justify-content: center;
  align-items: center;
`