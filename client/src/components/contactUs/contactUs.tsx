import React from "react";
import styles from "../../styling/contactUs/contactUs.module.css";
import NavigationBar from "../navigationBar";

type myProps = {
  loggedIn: boolean;
};

const ContactUs: React.FC<myProps> = ({ loggedIn }: myProps) => {
  return (
    <div id={styles.contactUs}>
      <NavigationBar loggedIn={loggedIn}></NavigationBar>
      <div id={styles.contactUsInfo}>
        <p id={styles.paragraph}>Send us a message and we’ll reply as soon as we can.</p>
        <form id={styles.inputs}>
          <input type="text" placeholder="Your email.." className={styles.input1}></input>
          <input type="text" placeholder="Title.." className={styles.input1}></input>
          <textarea rows={4} placeholder="Message.." id={styles.input2}></textarea>
        </form>
        <div id={styles.submit}>Submit</div>
      </div>
    </div>
  );
};

export default ContactUs;
