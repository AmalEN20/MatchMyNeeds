import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import '../../App.css';

import { ADD_REQUEST } from '../../utils/mutations';
import Auth from '../../utils/auth';

const RequestForm = ({ requestItem, requestDescription  }) => {
  const [request, setRequest] = useState('');

  const [addRequest, { error }] = useMutation(ADD_REQUEST);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await addRequest({
        variables: { requestItem, requestDescription },
      });

      setRequest('');
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
        </p>
      )}
    </div>
  );
      }; 
export default RequestForm;