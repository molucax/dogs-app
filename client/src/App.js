import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home.jsx";

const App = () => {
  return (
    <div className="App">
      <Route exact path="/home" component={Home} />
    </div>
  );
}

export default App;
