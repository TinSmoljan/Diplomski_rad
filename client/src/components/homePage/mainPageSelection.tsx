import React from "react";
import styles from "../../styling/homePage/mainPageSelection.module.css";
import gymIllustration from "../../images/gym-selection-illustration.png";
import restaurantIllustration from "../../images/restaurant-selection-illustration.png";
import cafeIllustration from "../../images/cafe-selection-illustration.png";

const MainPageSelection: React.FC<{}> = () => {
  return (
    <div id={styles.selection}>
      <div id={styles.gym}>
        <img id={styles.gym_illustration} src={gymIllustration} alt="Gym-illustration" />
        <div id={styles.text_gym}>Gym</div>
      </div>
      <div id={styles.restaurant}>
        <img id={styles.restaurant_illustration} src={restaurantIllustration} alt="Restaurant-illustration" />
        <div id={styles.text_restaurant}>Restaurant</div>
      </div>
      <div id={styles.cafe}>
        <img id={styles.cafe_illustration} src={cafeIllustration} alt="Cafe-illustration" />
        <div id={styles.text_cafe}>Café</div>
      </div>
    </div>
  );
};

export default MainPageSelection;
