import React from "react";
import NavigationBar from "../../components/navigationBar";
import MainPageStartInfo from "../homePage/mainPageStart-info";
import style from "../../styling/homePage/mainPageStart.module.css";

type myProps = {
  loggedIn: boolean;
};

class MainPageStart extends React.Component<myProps, {}> {
  render() {
    return (
      <div id={style.main}>
        <NavigationBar loggedIn={this.props.loggedIn}></NavigationBar>
        <MainPageStartInfo></MainPageStartInfo>
      </div>
    );
  }
}

export default MainPageStart;
