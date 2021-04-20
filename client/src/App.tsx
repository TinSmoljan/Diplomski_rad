import React, { useState } from "react";
import MainPageStart from "./components/homePage/mainPageStart";
import MainPageGym from "./components/homePage/mainPageGym";
import MainPageTransition from "./components/homePage/mainPageTransition";
import MainPageRestaurant from "./components/homePage/mainPageRestaurant";
import MainPageCafe from "./components/homePage/mainPageCafe";
import MainPageContactUs from "./components/homePage/mainPageContactUs";
import MainPageSelection from "./components/homePage/mainPageSelection";

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
      <MainPageContactUs></MainPageContactUs>
      <MainPageSelection></MainPageSelection>
    </div>
  );
}

export default App;
