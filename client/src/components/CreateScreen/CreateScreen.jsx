import React from 'react'
import styled from "styled-components"
import Form from './Form'

export default function CreateScreen() {
  return (
    <Screen>
      <Form />
    </Screen>
  )
}

const Screen = styled.div`
  height: 100%;
  width: 92%;
`