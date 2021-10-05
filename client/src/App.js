import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Nav from "./components/Nav.jsx";
import Home from "./components/Home.jsx";
import Dog from "./components/Dog.jsx";
import Form from "./components/Form.jsx";

const App = () => {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={Nav} />
      <Route exact path="/home" component={Home} />
      <Route path="/dog/:id" component={Dog} />
      <Route path="/create" component={Form} />
    </div>
  );
}

export default App;
