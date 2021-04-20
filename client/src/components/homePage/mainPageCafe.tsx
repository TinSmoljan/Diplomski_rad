import React from "react";
import cafeIllustration from "../../images/Cafe-illustration1.png";
import cafeIcon from "../../images/cafe-icon.png";
import styles from "../../styling/homePage/mainPageCafe.module.css";

const MainPageCafe: React.FC<{}> = () => {
  return (
    <div className={[styles.instance_page, styles.background_cafe].join(" ")}>
      <div id={styles.cafe_illustration}>
        <img src={cafeIllustration} alt="cafe-illustration"></img>
      </div>
      <div className={styles.info}>
        <h1 className={[styles.main_text, styles.main_text_color_cafe].join(" ")}>Cafés</h1>
        <div className={[styles.secondary_text, styles.secondary_text_color_cafe].join(" ")}>
          <p>-Browse through the cafés in your area.</p>
          <p>-See how many spots are available in the café and flip through the galeries so you have an idea of what they look like.</p>
        </div>
        <div className={[styles.browse_botun, styles.secondary_text_color_cafe].join(" ")}>
          Browse cafés <img id={styles.cafe_logo} src={cafeIcon} alt="dumbell-icon"></img>
        </div>
      </div>
    </div>
  );
};

export default MainPageCafe;
