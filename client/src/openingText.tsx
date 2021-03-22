import React from "react";
import "./styling/openingText.css";

type User_name = {
  name: string;
};

const IntroText: React.FC<User_name> = ({ name }) => (
  <div>
    <h1 id="prviRed">Hello,</h1>
    <h2 id="drugiRed">my name is {name} and this will be my master's degree.</h2>
  </div>
);

export default IntroText;
