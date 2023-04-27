import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import '../../src/App.css';

import { ADD_REQUEST } from '../../src/utils/mutations';
import Auth from '../../src/utils/auth';

const RequestForm = ({ requestItem, requestDescription  }) => {
  const [request, setRequest] = useState('');

  const [addRequest, { error }] = useMutation(ADD_REQUEST);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await addRequest({
        variables: { requestItem, requestDescription },
      });

      addRequest('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className='request'> What are you looking for? </h1>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}>
          <div className="col-12 col-lg-9">
            <input
              placeholder="Type your request here."
              value={ requestItem }
              className="form-input w-100"
              onChange={(event) => setRequest(event.target.value)}
            />
            <input
              placeholder="Type the description here."
              value={ requestDescription }
              className="form-input w-100"
              onChange={(event) => setRequest(event.target.value)}
            />
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              Submit
            </button>
            <label> <input type="checkbox" /> Saved to My To-Dos</label>
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
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default RequestForm;