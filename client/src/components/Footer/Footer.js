import React from "react";
import "./Footer.css";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Contact Us</h2>
            <a href="mailto:bettybowielu@gmail.com">Betty Lu</a>
            <a href="mailto:kristinaa7@live.com">Kristina Dukes</a>
            <a href="mailto:jlddukes@gmail.com">Jordan Dukes</a>
            <a href="mailto:amalengulatov19@gmail.com">Amal Engulatov</a>
          </div>
        </div>
        <div className="footer-link-wrapper"></div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              MMN
              <i className="fab fa-typo3" />
            </Link>
          </div>
          <small className="website-rights">MMN © 2023</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
