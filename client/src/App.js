import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Home from "./components/Home.jsx";
import Dog from "./components/Dog.jsx";
import Form from "./components/Form.jsx";
import s from "./App.module.css";

const App = () => {
  return (
    <div className={s.app}>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route path="/dog/:id" component={Dog} />
      <Route path="/create" component={Form} />
    </div>
  );
}

export default App;
