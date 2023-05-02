import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { BrowserRouter as Navigate } from "react-router-dom";

import "../../src/App.css";

import Auth from "../../src/utils/auth";

import RequestPosts from "../components/AllRequests";
import RequestForm from "../components/RequestForm/index";

import { QUERY_ME, QUERY_USER } from "../utils/queries";
import Footer from '../components/Footer/Footer';

const MyRequests = () => {

  const divStyles = {
    boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.2)',

  };

  const { username } = useParams();

  const { loading, data } = useQuery(username ? QUERY_USER : QUERY_ME, {
    variables: { username: username },
  });

  const user = data?.me || data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h3>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h3>
    );
  }

  if (Auth.loggedIn() && Auth.getProfile().data.email === data.me.email) {

    return (
      
      <div style={divStyles}>
        <div>
          <RequestForm />
        </div>
        <div>
          <h1 style={{ color: 'White', fontSize: '2rem', fontWeight: 'bold', textAlign: "center", marginTop: '-400px' }} className="request">
            My Requests
          </h1>
          <RequestPosts requests={user.requests} />
        </div>
        <Footer />

    </div>
    )
  }

};

export default MyRequests;