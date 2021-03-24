import React from "react";
import running from "../images/Fitness-illustration.png";
import dumbell from "../images/dumbell-icon.png";
import "../styling/mainPage-gym.css";

const MainPageGym: React.FC<{}> = () => {
  return (
    <div className="main-page-right">
      <div id="gym-illustration">
        <img src={running} alt="fitness_illustration"></img>
      </div>
      <div id="info-gym">
        <h1 className="main-text-right">Gyms</h1>
        <div className="paragraph-right">
          <p>-Browse through the gyms in your area.</p>
          <p>
            -See how many spots are available in the gym and flip through the
            galeries so you have an idea of what they look like.
          </p>
          <p>-Reserve your spot so that you don't have to wait.</p>
        </div>
        <div className="botun-right">
          Browse gyms <img id="dumbell-logo"src={dumbell} alt="dumbell-icon"></img>
        </div>
      </div>
    </div>
  );
};

export default MainPageGym;