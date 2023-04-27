import React from "react";
import { useParams } from "react-router-dom";
import { BrowserRouter as Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import "../../src/App.css";

import Auth from "../../src/utils/auth";

import RequestPosts from "../components/AllRequests";
import RequestForm from "../components/RequestForm/index";

import { QUERY_ME, QUERY_USER } from "../utils/queries";


const MyRequests = () => {
  const { username } = useParams();

  const { loading, data } = useQuery(username ? QUERY_USER : QUERY_ME, {
    variables: { username: username },
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === username) {
    return <Navigate to="/request/me" />;
  }

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

  return (
    <div>
      <div>
        <div>
          <h1 className="request">
            Viewing {username ? `${user.username}'s` : "your"} profile.
          </h1>
        </div>
        <div>
          <RequestPosts requests={user.requests} />
        </div>

        <div>
          <RequestForm />
        </div>
      </div>
    </div>
  );
};

export default MyRequests;
