import React from "react";
import NavigationBar from "../navigationBar";
import styles from "../../styling/signIn/signIn.module.css";
import sphere from "../../images/white-3d-sphere.png";

type myProps = {
  loggedIn: boolean;
};

const SignIn: React.FC<myProps> = ({ loggedIn }: myProps) => {
  return (
    <div id={styles.sign_in}>
      <NavigationBar loggedIn={loggedIn}></NavigationBar>
      <div id={styles.sign_in_info}>
        <div id={styles.border_caption_inputs_and_button}>
          <div id={styles.border_and_caption}>
            <div id={styles.border}></div>
            <div id={styles.caption}>Sign in</div>
          </div>
          <div id={styles.inputs}>
            <input type="text" placeholder="Username.." className={styles.individual_input}></input>
            <input type="password" placeholder="Password.." className={styles.individual_input}></input>
          </div>
          <div id={styles.submit}>Submit</div>
        </div>
        <img src={sphere} alt="A sphere" id={styles.sphere} />
        <p id={styles.paragraph}>
          You don’t have an account but you’d like to reserve spots in establishments or feature your own establishment? Sign up now.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
