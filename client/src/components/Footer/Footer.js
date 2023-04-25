import React from "react";
import "./Footer.css";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-link-items">
        <h2>About Us</h2>
        <h3>
          This website was created so that anyone can post their
          needs/request for a specific item and connects people from all over
          the nation to fulfill their ask. Purely giving out of the goodness of
          one’s heart or simply to declutter their space. There’s no limit to
          how much you can give or how much you can ask. The beauty about our
          application is that we connect people through community and the
          experience of sharing that item. What sets us apart from a thrift
          store is that users do not blindly give, they are personally donating
          their item to an individual who will give it a second chance.
        </h3>
      </section>
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
