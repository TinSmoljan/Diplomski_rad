import React from "react";
import NavigationBar from "../components/navigationBar";
import MainPageStartInfo from "./mainPageStart-info";
import "../styling/mainPageStart.css"

type myProps = {
  loggedIn: boolean;
};

class MainPageStart extends React.Component<myProps, {}> {
  render() {
    return (
      <div id="main">
        <NavigationBar loggedIn={this.props.loggedIn}></NavigationBar>
        <MainPageStartInfo></MainPageStartInfo>
      </div>
    );
  }
}

export default MainPageStart;
