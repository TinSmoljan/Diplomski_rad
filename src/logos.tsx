import React from "react";
import * as icons from "react-icons/io";
import "./styling/logos.css";

type Logos_name = {
  name_logo: string;
};

type MyState = {
  name_state: string;
};

// const Logos: React.FC<Logos_name> = ({ name }) => (

//   <icons.IoMdSchool id="mainLogo"></icons.IoMdSchool>
// )

class Logos extends React.Component<Logos_name, MyState> {
  state: MyState = { name_state: this.props.name_logo };

  render() {
    if (this.state.name_state === "school") {
      return <icons.IoMdSchool id="mainLogo"></icons.IoMdSchool>;
    } else if (this.state.name_state === "github") {
      return <icons.IoLogoGithub className="attendeeLogo"></icons.IoLogoGithub>;
    } else if (this.state.name_state === "google") {
      return <icons.IoLogoGoogle className="attendeeLogo"></icons.IoLogoGoogle>;
    }
  }
}

export default Logos;
