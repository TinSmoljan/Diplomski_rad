import React from "react";
import style from "../../styling/homePage/mainPageTransition.module.css";

type transitionProperties = {
  firstColor: string;
};

const MainPageTransition = ({ firstColor }: transitionProperties): JSX.Element => {
  if (firstColor === "blue") {
    return (
      <div id={style.transition_blue}>
        <div className={[style.child1, style.second_orange, style.way_downRight].join(" ")}></div>
      </div>
    );
  } else if (firstColor === "orange") {
    return (
      <div id={style.transition_orange}>
        <div className={[style.child2, style.second_babyBlue, style.way_upRight].join(" ")}></div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Krivo poslane vrijednosti tranzicije</h1>
      </div>
    );
  }
};

export default MainPageTransition;
