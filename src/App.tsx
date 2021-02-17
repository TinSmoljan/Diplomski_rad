import React from "react";
import "./styling/App.css";
import Logos from "./logos";
import IntroText from "./openingText";
import Contact from "./contactInfo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logos name_logo="school"></Logos>
        <IntroText name="Tin Smoljan"></IntroText>
        <Contact></Contact>
      </header>
    </div>
  );
}

export default App;
