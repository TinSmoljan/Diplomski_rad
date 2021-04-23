import React from "react";
import MainPageStart from "./mainPageStart";
import MainPageGym from "./mainPageGym";
import MainPageTransition from "./mainPageTransition";
import MainPageRestaurant from "./mainPageRestaurant";
import MainPageCafe from "./mainPageCafe";
import MainPageContactUs from "./mainPageContactUs";
import MainPageSelection from "./mainPageSelection";

type myProps = {
  loggedIn: boolean;
};

const MainPage: React.FC<myProps> = ({ loggedIn }: myProps) => {
  return (
    <div>
      <MainPageStart loggedIn={loggedIn}></MainPageStart>
      <MainPageGym></MainPageGym>
      <MainPageTransition firstColor="blue"></MainPageTransition>
      <MainPageRestaurant></MainPageRestaurant>
      <MainPageTransition firstColor="orange"></MainPageTransition>
      <MainPageCafe></MainPageCafe>
      <MainPageContactUs></MainPageContactUs>
      <MainPageSelection></MainPageSelection>
    </div>
  );
};

export default MainPage;
