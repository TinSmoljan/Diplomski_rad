import React from "react";
import Logos from "./logos";
import "./styling/contactInfo.css";

const Contact = () => (
  <div className="infoDiv">
    <h1 id="info">Info:</h1>
    <div className="informationElement">
      <Logos name_logo="github"></Logos>
      <h2>
        <a href="https://github.com/TinSmoljan" className="imeOsobe">
          Tin Smoljan
        </a>
      </h2>
    </div>
    <div className="informationElement">
      <Logos name_logo="google"></Logos>
      <h2>
        <a href="http://marjan.fesb.hr/~mcagalj/" className="imeOsobe">
          Mario Čagalj
        </a>
      </h2>
    </div>
  </div>
);

export default Contact;
