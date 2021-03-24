import React from "react";
import "../styling/navigationBar.css";
import { ReactComponent as Logo } from "../images/Main-logo.svg";
import { RiLogoutBoxLine } from "react-icons/ri";

const isLogedIn = (loggedIn: boolean) => {
  if (loggedIn === false) {
    return (
      <div id="sign-up-and-sign-in">
        <div id="sign-up">Sign up</div>
        <div id="sign-in">Sign in</div>
      </div>
    );
  } else {
    return (
      <div id="name-and-log-out">
        <h2 id="ime">Tin Smoljan</h2>
        <RiLogoutBoxLine id="log-out"></RiLogoutBoxLine>
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
    <div id="navigation-bar">
      <div id="logo-and-title">
        <div id="main-logo">
          <Logo />
        </div>
        <div id="organize">
          <h1> Organize </h1>
        </div>
      </div>
      <div id="rest-of-navigation">
        <div id="my-corner-and-contact-us">
          <h2 id="my-corner">My corner</h2>
          <h2 id="contact-us">Contact us</h2>
        </div>
        {button}
      </div>
    </div>
  );
};

export default navigationBar;
