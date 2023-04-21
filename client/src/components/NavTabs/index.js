import React from "react";

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function NavTabs({ currentPage, handlePageChange }) {
  return (
    <header>
      <h1>MatchMyNeeds</h1>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            href="#ToDoList"
            onClick={() => handlePageChange("ToDoList")}
            // This is a conditional (ternary) operator that checks to see if the current page is "Home"
            // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
            className={
              currentPage === "ToDoList" ? "nav-link active" : "nav-link"
            }
          >
            To Do List
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#MyRequests"
            onClick={() => handlePageChange("MyRequests")}
            // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
            className={
              currentPage === "MyRequests" ? "nav-link active" : "nav-link"
            }
          >
            My Requests
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#HomePage"
            onClick={() => handlePageChange("HomePage")}
            // Check to see if the currentPage is `Blog`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
            className={
              currentPage === "HomePage" ? "nav-link active" : "nav-link"
            }
          >
            Home Page
          </a>
        </li>
      </ul>
    </header>
  );
}

export default NavTabs;
