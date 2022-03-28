import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import NewHome from "./components/NewHome/NewHome.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import DogScreen from "./components/DogScreen/DogScreen.jsx";
import CreateScreen from "./components/CreateScreen/CreateScreen.jsx";

const App = () => {
  return (
    <Wrapper>
      <Route path="/" component={Navbar} />
      <Route exact path="/" component={NewHome} />
      <Route path="/dog/:id" component={DogScreen} />
      <Route path="/create" component={CreateScreen} />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`