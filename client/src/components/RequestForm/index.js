import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_REQUEST } from '../../utils/mutations';

import Auth from '../../utils/auth';

const RequestForm = ({ userId }) => {
  const [request, setRequest] = useState('');

  const [addRequest, { error }] = useMutation(ADD_REQUEST);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await addRequest({
        variables: { userId, request },
      });

      setRequest('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4>Please submit your request below.</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <input
              placeholder="Endorse some skills..."
              value={request}
              className="form-input w-100"
              onChange={(event) => setRequest(event.target.value)}
            />
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              Submit Request
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
          You need to be logged in to submit request. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default RequestForm;
