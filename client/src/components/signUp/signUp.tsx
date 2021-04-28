import React, { useState } from "react";
import NavigationBar from "../navigationBar";
import styles from "../../styling/signUp/signUp.module.css";

type myProps = {
  loggedIn: boolean;
};

const errorMessage = (error: boolean) => {
  if (error === false) {
    return
  } else {
    return <div id={styles.error_different_passwords}>Password doesn't match!</div>;
  }
};

const handleChange = (event: any, password: string, setError: Function) => {
  if (event.target.value !== password) {
    setError(true);
  } else {
    setError(false);
  }
};

const SignUp: React.FC<myProps> = ({ loggedIn }: myProps) => {
  let [password, setPassword] = useState("");
  let [error, setError] = useState(false);

  return (
    <div id={styles.sign_up}>
      <NavigationBar loggedIn={loggedIn}></NavigationBar>
      <div id={styles.sign_up_info}>
        <div id={styles.sign_up_caption}>Sign up</div>
        <div id={styles.inputs_paragraph_and_button}>
          <div id={styles.inputs}>
            <input type="text" placeholder="First name (Username)" className={styles.individual_input}></input>
            <input type="text" placeholder="Last name" className={styles.individual_input}></input>
            <input type="text" placeholder="E-mail" className={styles.individual_input}></input>
            <input
              type="password"
              placeholder="Password"
              className={styles.individual_input}
              onChange={(event) => setPassword(event.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Repeat password"
              className={styles.individual_input}
              onChange={(event) => handleChange(event, password, setError)}
            ></input>
            {errorMessage(error)}
            <div className={[styles.submit, styles.no_display].join(" ")}>Submit</div>
          </div>
          <div id={styles.break}></div>
          <div id={styles.paragraph_and_button}>
            <p id={styles.paragraph}>
              By signing up you get access to reserving spots in the given establishments. If you’re a franchise owner this helps you manage
              your establishment without the need for contacting us after your initial inquiry.
            </p>
            <div className={styles.submit}>Submit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
