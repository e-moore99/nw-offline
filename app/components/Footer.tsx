import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerLinks}>
          <h4>Expore New World</h4> <br />
          <ul>New World Clubcard</ul>
          <ul>Christmas Club</ul>
          <ul>Gift Cards</ul>
          <ul>Fuel Vouchers</ul>
          <ul>New World app</ul>
        </div>
        <div className={styles.footerLinks}>
          <h4>Legal</h4> <br />
          <ul>Privacy policy</ul>
          <ul>Website T&Cs</ul>
          <ul>Online shopping T&Cs</ul>
          <ul>Liquor licence</ul>
          <ul>North Island refund & returns policy</ul>
          <ul>Same day timeslots T&Cs</ul>
          <ul>Promo Codes Terms and Conditions</ul>
        </div>
        <div className={styles.footerLinks}>
          <h4>Customer service</h4>
          <br />
          <ul>Contact us</ul>
          <ul>Store Finder</ul>
          <ul>FAQs</ul>
          <ul>Scam alert</ul>
          <ul>Surveys</ul>
        </div>
        <div className={styles.footerLinks}>
          <h4>More</h4>
          <br />
          <ul>About Foodstuffs</ul>
          <ul>Become a supplier</ul>
          <ul>Jobs</ul>
          <ul>Pams</ul>
          <ul>News</ul>
        </div>
        <div className={styles.footerLinks}>
          <h4>Follow us</h4>
          <br />
        </div>
        <div className={styles.appDiv}>
          <p>Download the New World app</p>
        </div>
      </div>
      <div className={styles.footerBtm}>
        <h2>©️ 2025 Mission Ready Offline Team. All rights reserved.</h2>
      </div>
    </div>
  );
};

export default Footer;
