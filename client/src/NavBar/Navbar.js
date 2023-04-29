import React, { useState, useEffect } from "react";
import { Button } from "../components/Button/Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Auth from "../utils/auth";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            MMN
            <i className="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>



            {Auth.loggedIn() ? (
  <li className="nav-item">
  <Link
    to="/request/me"
    className="nav-links"
    onClick={closeMobileMenu}
  >
    My Requests
  </Link>
</li>
) : (
  <div>
  </div>
)}

{Auth.loggedIn() ? (
            <li className="nav-item">
            <Link to="Post" className="nav-links" onClick={closeMobileMenu}>
              Post
            </Link>
          </li>
) : (
  <div>
  </div>
)}

            <li>
              <Link
                to="/signup"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                LOG IN
              </Link>
            </li>
          </ul>
          {Auth.loggedIn() ? (
            <div> 
              {button && (
              <Button buttonStyle="btn--outline" onClick={() => Auth.logout()}>
                  LOG OUT
              </Button>
              )} 
            </div>
          ) : (
            <div>
            {button && <Button buttonStyle="btn--outline">LOG IN</Button>}
            </div>
          )}


          



          
        </div>
      </nav>
    </>
  );
}




export default Navbar;
