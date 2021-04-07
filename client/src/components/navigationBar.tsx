import React from "react";
import styles from "../styling/navigationBar.module.css";
import { ReactComponent as Logo } from "../images/Main-logo.svg";
import { RiLogoutBoxLine } from "react-icons/ri";

const isLogedIn = (loggedIn: boolean) => {
  if (loggedIn === false) {
    return (
      <div id={styles.sign_up_and_sign_in}>
        <div id={styles.sign_up}>Sign up</div>
        <div id={styles.sign_in}>Sign in</div>
      </div>
    );
  } else {
    return (
      <div id={styles.name_and_log_out}>
        <h2 id={styles.ime}>Tin Smoljan</h2>
        <RiLogoutBoxLine id={styles.log_out}></RiLogoutBoxLine>
      </div>
    );
  }
};

type navigationBar_properties = {
  loggedIn: boolean;
};

const navigationBar: React.FC<navigationBar_properties> = ({ loggedIn }) => {
  const button = isLogedIn(loggedIn);

  return (
    <div id={styles.navigation_bar}>
      <div id={styles.logo_and_title}>
        <div id={styles.main_logo}>
          <Logo />
        </div>
        <div id={styles.organize}>
          <h1> Organize </h1>
        </div>
      </div>
      <div id={styles.rest_of_navigation}>
        <div id={styles.my_corner_and_contact_us}>
          <h2 id={styles.my_corner}>My corner</h2>
          <h2 id={styles.contact_us}>Contact us</h2>
        </div>
        {button}
      </div>
    </div>
  );
};

export default navigationBar;
