import React from "react";
import "../styling/navigationBar.css";
import { ReactComponent as Logo } from "../images/Main-logo.svg";
import logOutIcon from "../images/logout.png";
import {RiLogoutBoxLine} from "react-icons/ri"


const isLogedIn = (loggedIn: boolean) => {
  if (loggedIn === false) {
    return (
      <div id="sign-up-and-sign-in">
        <button id="sign-up">Sign up</button>
        <button id="sign-in">Sign in</button>
      </div>
    );
  } else {
    return (
      <div id="name-and-log-out">
        {/* <h2 id="ime">Tin Smoljan</h2>
        <img id="log-out" src={logOutIcon} alt="odjava"></img> */}
        <h2 id="ime">Tin Smoljan</h2>
        {/* <img id="log-out" src={MeetingRoomIcon} alt="odjava"></img> */}
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
