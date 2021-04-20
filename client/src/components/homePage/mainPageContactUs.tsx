import React from "react";
import contactUsIllustration from "../../images/ContactUs-illustration1.png";
import emailIcon from "../../images/email-icon.png";
import styles from "../../styling/homePage/mainPageContactUs.module.css";

const MainPageContactUs: React.FC<{}> = () => {
  return (
    <div id={styles.contact_us}>
      <div id={styles.info}>
        <div id={styles.headings}>
          <h2 id={styles.secondary_heading}>WE REPLY FAST</h2>
          <h1 id={styles.main_heading}>Contact us</h1>
        </div>
        <div id={styles.paragraph}>
          <p>
            If you ran into some problems or just have some questions you’re not quite sure the answer to feel free to send us an email and
            we’ll gladly answer it. Furthermore, if you want us to feature your bussiness contact us.
          </p>
        </div>
        <div id={styles.send_an_email_button}>
          Send an email <img id={styles.email_icon} src={emailIcon} alt="Email Icon"></img>
        </div>
      </div>
      <div id={styles.contactUs_illustration}>
        <img src={contactUsIllustration} alt="Contact us illustration"></img>
      </div>
    </div>
  );
};

export default MainPageContactUs;
