import React, { useState } from "react";
import styles from "../styling/navigationBar.module.css";
import { ReactComponent as Logo } from "../images/Main-logo.svg";
import { RiLogoutBoxLine } from "react-icons/ri";
import { RiMenu3Line } from "react-icons/ri";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";

const isLogedIn = (loggedIn: boolean): JSX.Element => {
  if (loggedIn === false) {
    return (
      <div id={styles.sign_up_and_sign_in}>
        <div id={styles.sign_up}>
          <div className={styles.normalize_link}>
            Sign up
          </div>
        </div>
        <div id={styles.sign_in}>
          <div className={styles.normalize_link}>
            Sign in
          </div>
        </div>
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

const isLogedInHamburger = (loggedIn: boolean): JSX.Element => {
  if (loggedIn === true) {
    return (
      <div className={styles.name_and_log_out_or_sign_up_and_sign_in}>
        <p>Tin Smoljan</p>
        <p>Log out</p>
      </div>
    );
  } else {
    return (
      <div className={styles.name_and_log_out_or_sign_up_and_sign_in}>
        <p>
          <div className={styles.normalize_link}>
            Sign up
          </div>
        </p>
        <p>
          <div className={styles.normalize_link}>
            Sign in
          </div>
        </p>
      </div>
    );
  }
};

const hamburgerOrDropDownDecide = (dropDown: boolean, userOrVisitorHamburger: JSX.Element, setDropDown: Function): JSX.Element => {
  if (dropDown === false) {
    return (
      <div id={styles.hamburger_menu} onClick={() => setDropDown(true)}>
        <RiMenu3Line id={styles.menu}></RiMenu3Line>
      </div>
    );
  } else {
    return (
      <div id={styles.drop_down}>
        <GrClose id={styles.x} onClick={() => setDropDown(false)}></GrClose>
        <p>My corner</p>
        <p>
          <div className={styles.normalize_link}>
            Contact us
          </div>
        </p>
        {userOrVisitorHamburger}
      </div>
    );
  }
};

type navigationBar_properties = {
  loggedIn: boolean;
};

const NavigationBarForTest: React.FC<navigationBar_properties> = ({ loggedIn }: navigationBar_properties) => {
  const userOrVisitor = isLogedIn(loggedIn);
  const userOrVisitorHamburger = isLogedInHamburger(loggedIn);
  let [dropDown, setDropDown] = useState(false);
  let hamburgerOrDropDown = hamburgerOrDropDownDecide(dropDown, userOrVisitorHamburger, setDropDown);

  return (
    <div id={styles.navigation_bar}>
      <div id={styles.logo_and_title}>
        <div id={styles.main_logo}>
          <div >
            <Logo />
          </div>
        </div>
        <div id={styles.organize}>
          <h1> Organize </h1>
        </div>
      </div>
      <div id={styles.rest_of_navigation}>
        <div id={styles.my_corner_and_contact_us}>
          <h2 id={styles.my_corner}>My corner</h2>
          <div id={styles.contact_us}>
            <h2>Contact us</h2>
          </div>
        </div>
        {hamburgerOrDropDown}
        {userOrVisitor}
      </div>
    </div>
  );
};

export default NavigationBarForTest;