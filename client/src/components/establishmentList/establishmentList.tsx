import NavigationBar from "../navigationBar";
import styles from "../../styling/establishmentList/establishmentList.module.css";
import NavigationBarForTest from "../navigationBarForTest";
import React from "react";
import gymIcon from "../../images/dumbell-icon.png";

type myProps = {
  loggedIn: boolean;
};

type myState = {
  loggedIn: boolean;
};

class EstablishmentList extends React.Component<myProps, myState> {
  render() {
    return (
      <div id={styles.establishment_list}>
        <NavigationBarForTest loggedIn={this.props.loggedIn}></NavigationBarForTest>
        <div id={styles.establishment_list_info}>
          <div id={styles.heading_and_search_bar}>
            <div id={styles.establishment_type_heading}>
              Gyms <img id={styles.heading_logo} src={gymIcon} alt="dumbell-icon"></img>
            </div>
            <input id={styles.search_bar} placeholder="Search.."></input>
          </div>
        </div>
      </div>
    );
  }
}

// const EstablishmentList: React.FC<myProps> = ({ loggedIn }: myProps) => {
//   return (
//     <div id={styles.establishment_list}>
//       <NavigationBarForTest loggedIn={loggedIn}></NavigationBarForTest>
//     </div>
//   );
// };

export default EstablishmentList;
