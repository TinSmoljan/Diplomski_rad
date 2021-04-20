import React from "react";
import restaurantIllustration from "../../images/Restaurant-illustration.png";
import restaurantIcon from "../../images/restaurant-icon.png";
import styles from "../../styling/homePage/mainPageRestaurant.module.css";

const MainPageRestaurant: React.FC<{}> = () => {
  return (
    <div className={[styles.instance_page, styles.background_restaurant].join(" ")}>
      <div className={styles.info}>
        <h1 className={[styles.main_text, styles.left, styles.main_text_color_restaurant].join(" ")}>Restaurants</h1>
        <div className={[styles.secondary_text, styles.left, styles.secondary_text_color_restaurant].join(" ")}>
          <p>-Browse through the restaurants in your area.</p>
          <p>
            -See how many spots are available in the restaurant and flip through the galeries so you can see if they're the right fit for
            your taste.
          </p>
          <p>-Reserve your spot so you can dine in peace.</p>
        </div>
        <div className={[styles.browse_botun, styles.secondary_text_color_restaurant].join(" ")}>
          Browse restaurants
          <img id={styles.restaurant_logo} src={restaurantIcon} alt="restaurant-icon"></img>
        </div>
      </div>
      <div id={styles.restaurant_illustration}>
        <img src={restaurantIllustration} alt="restaurant_illustration"></img>
      </div>
    </div>
  );
};

export default MainPageRestaurant;
