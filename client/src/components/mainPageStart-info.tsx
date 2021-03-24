import React from "react";
import cube from "../images/RoundCube-Orange-Glossy.png";
import "../styling/mainPageStart-info.css";
import { BsChevronDown } from "react-icons/bs";

const MainPageStartInfo: React.FC<{}> = () => {
  return (
    <div id="main-page-info">
      <div className="main-text">
        <h1>Help us help you organize your day</h1>
      </div>
      <div className="secondary-text">
        <p>
          Don't waste your time exploring your options on foot, reserve your
          place before you get there.
        </p>
      </div>
      <div id="go-straight-to-selection">
        Go straight to selection <BsChevronDown id="down-arrow"></BsChevronDown>
      </div>
      <img id="cube" src={cube} alt="a cube"></img>
    </div>
  );
};

export default MainPageStartInfo;
