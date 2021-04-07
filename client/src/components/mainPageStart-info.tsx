import React from "react";
import cube from "../images/Orange-Cube.png";
import styles from "../styling/mainPageStart-info.module.css";
import { BsChevronDown } from "react-icons/bs";

const MainPageStartInfo: React.FC<{}> = () => {
  return (
    <div id={styles.main_page_info}>
      <div id={styles.main_text}>
        <h1>Help us help you organize your day</h1>
      </div>
      <div id={styles.secondary_text}>
        <p>
          Don't waste your time exploring your options on foot, reserve your
          place before you get there.
        </p>
      </div>
      <div id={styles.go_straight_to_selection}>
        Go straight to selection <BsChevronDown id={styles.down_arrow}></BsChevronDown>
      </div>
      <img id={styles.cube} src={cube} alt="a cube"></img>
    </div>
  );
};

export default MainPageStartInfo;
