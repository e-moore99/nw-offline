import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
import Instagram from "@/public/instagram.png";
import Facebook from "@/public/facebook.png";
import Frolley from "@/public/frolley.png";
import FSLogo from "@/public/Foodstuffs_Logo_White.png";
import AppStore from "@/public/app-store-badge.png";
import PlayStore from "@/public/google-play-badge.png";

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
        <div className={styles.followUs}>
          <h4>Follow us</h4>
          <div>
            <Image className="w-7 pt-4" src={Facebook} alt="fb" />
            <Image className="w-7 pt-4" src={Instagram} alt="ig" />
          </div>
          
            <Image className="w-30 pt-4" src={FSLogo} alt="logo" />
            <Image className="w-12 pt-4" src={Frolley} alt="frolley" />
          
        </div>
        <div className={styles.appDiv}>
          <p>Download the New World app</p>
          <Image className="w-25 pt-4" src={AppStore} alt="app store" />
          <Image className="w-25 pt-4" src={PlayStore} alt="play store" />
        </div>
      </div>
      <div className={styles.footerBtm}>
        <h2>©️ 2025 Mission Ready Offline Team. All rights reserved.</h2>
      </div>
    </div>
  );
};

export default Footer;
