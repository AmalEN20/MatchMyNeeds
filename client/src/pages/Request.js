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

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}>
          <div className="col-12 col-lg-9">
          <label> <h3> Requested Item: </h3> </label>
            <input
              placeholder="Type your request here."
              value={ requestItem }
              className="form-input w-100"
              onChange={(event) => setRequest(event.target.value)}
            />
            <label> <h3> Description of Item: </h3>  </label>
            <input
              placeholder="Type the description here."
              value={ requestDescription }
              className="form-input w-100"
              onChange={(event) => setRequest(event.target.value)}
            />
          </div>

          <div className="col-12 col-lg-3">
            <button onClick={handleFormSubmit} className="btn btn-info btn-block py-3" type="submit">
              Submit
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      ) : (
        <p>
          You need to be logged in to add a request. Please{' '}
          <Link to="/signup">login.</Link>
          <Link to="/SingleRequest">Second Link.</Link>
        </p>
      )}
        <div>
          <RequestForm />
        </div>
      </div>
    </div>
  );
};

export default MyRequests;
