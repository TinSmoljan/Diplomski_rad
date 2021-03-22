import React, { useState } from "react";
import "./styling/App.css";
import Logos from "./logos";
import IntroText from "./openingText";
import Contact from "./contactInfo";
import NavigationBar from "./components/navigationBar";

function App() {
  const [loggedIn, setLoggedin] = useState(false);

  return (
    <div className="App">
      <NavigationBar loggedIn={false}></NavigationBar>
    </div>
  );
}

export default App;
