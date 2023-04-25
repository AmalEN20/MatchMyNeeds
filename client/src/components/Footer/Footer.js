import React from 'react';
import './Footer.css';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
        You can unsubscribe at any time.
        </p>

        <div className='input-areas'>

        </div>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>

          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Betty Lu</Link>
            <Link to='/'>Kristina Dukes</Link>
            <Link to='/'>Jordan Dukes</Link>
            <Link to='/'>Amal Engulatov</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              MMN
              <i class='fab fa-typo3' />
            </Link>
          </div>
          <small class='website-rights'>MMN © 2023</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;