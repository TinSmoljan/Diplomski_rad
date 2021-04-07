import React from "react";
import gymIllustration from "../images/Fitness-illustration.png";
import gymIcon from "../images/dumbell-icon.png";
import styles from "../styling/mainPageGym.module.css";

const MainPageGym: React.FC<{}> = () => {
  return (
    <div className={[styles.instance_page, styles.background_gym].join(" ")}>
      <div id={styles.gym_illustration}>
        <img src={gymIllustration} alt="gym-illustration"></img>
      </div>
      <div className={styles.info}>
        <h1 className={[styles.main_text, styles.main_text_color_gym].join(" ")}>Gyms</h1>
        <div className={[styles.secondary_text, styles.secondary_text_color_gym].join(" ")}>
          <p>-Browse through the gyms in your area.</p>
          <p>-See how many spots are available in the gym and flip through the galeries so you have an idea of what they look like.</p>
          <p>-Reserve your spot so that you don't have to wait.</p>
        </div>
        <div className={[styles.browse_botun, styles.secondary_text_color_gym].join(" ")}>
          Browse gyms <img id={styles.gym_icon} src={gymIcon} alt="dumbell-icon"></img>
        </div>
      </div>
    </div>
  );
};

export default MainPageGym;
