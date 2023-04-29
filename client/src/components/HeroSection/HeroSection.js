import React from 'react';
import '../../App.css';
import { Button } from '../Button/Button';
import './HeroSection.css';
import Auth from "../../utils/auth";
function HeroSection() {
  return (
    <div className='hero-container'>
      
      <img src='/back/back4.jpeg' alt='backimg'/>
      <h1>MatchMyNeeds</h1>
      <p> This website was created so that anyone can post their
          needs/request for a specific item and connects people from all over
          the nation to fulfill their ask. Purely giving out of the goodness of
          one’s heart or simply to declutter their space. There’s no limit to
          how much you can give or how much you can ask. The beauty about our
          application is that we connect people through community and the
          experience of sharing that item. What sets us apart from a thrift
          store is that users do not blindly give, they are personally donating
          their item to an individual who will give it a second chance. </p>
      <div className='hero-btns'>
      {Auth.loggedIn() ? (

                  <div>
                  </div>
          ) : (
            <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            GET STARTED
          </Button>
          )}

      </div>
    </div>
  );
}

export default HeroSection;