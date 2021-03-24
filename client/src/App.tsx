import React, { useState } from "react";
import "./styling/App.css";
import MainPageStart from "./components/mainPageStart";
import MainPageGym from "./components/mainPage-gym";

function App() {
  const [loggedIn, setLoggedin] = useState(false);

  return (
    <div className="App">
      <MainPageStart loggedIn={true}></MainPageStart>
      <MainPageGym></MainPageGym>
    </div>
  );
}

export default App;
