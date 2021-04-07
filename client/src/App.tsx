import React, { useState } from "react";
import style from "./styling/App.module.css";
import MainPageStart from "./components/mainPageStart";
import MainPageGym from "./components/mainPageGym";
import MainPageTransition from "./components/mainPageTransition";
import MainPageRestaurant from "./components/mainPageRestaurant";
import MainPageCafe from "./components/mainPageCafe";

function App() {
  const [loggedIn, setLoggedin] = useState(false);

  return (
    <div className="App">
      <MainPageStart loggedIn={false}></MainPageStart>
      <MainPageGym></MainPageGym>
      <MainPageTransition firstColor="blue"></MainPageTransition>
      <MainPageRestaurant></MainPageRestaurant>
      <MainPageTransition firstColor="orange"></MainPageTransition>
      <MainPageCafe></MainPageCafe>
    </div>
  );
}

export default App;
