import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//Inport the 'useMutation()' hook from Apollo Client
import { useMutation } from '@apollo/client';
// import { QUERY_REQUESTS } from '../../utils/queries';

//Import the GraphQL mutation
import { ADD_REQUEST } from '../../utils/mutations';
// import Auth from '../../utils/auth';

const RequestForm = ({ requestItem, requestDescription, location  }) => {
  const [request, setRequest] = useState('');

  //Invoke 'useMutation()' hook to return a promise-based function and data about the ADD_REQUEST
  const [addRequest, { error }] = useMutation(ADD_REQUEST);
 

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    //Since mutation function is async, wrap in try...catch to catch any network error
    try {
      //Execute mutation and pass in defined parameter data as variables
      const data = await addRequest({
        variables: { requestItem, requestDescription, location },
      });

      setRequest('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1> Add Your Requests Here </h1>

      {Auth.loggedIn() ? (
        <form onSubmit={handleFormSubmit}>
          <div>
          <label> <h3> Requested Item : </h3> </label>
            <input
              placeholder="Type your request."
              type = "text"
              value={requestItem }
              onChange={(event) => setRequest(event.target.value)}
            />
            <label> <h3> Description of Item : </h3>  </label>
            <input
              placeholder="Type the description."
              type = "text"
              value={ requestDescription }
              onChange={(event) => setRequest(event.target.value)}
            />
              <label> <h3> Location for Delivery : </h3>  </label>
            <input
              placeholder="Type your city and state."
              type = "text"
              value={ location }
              onChange={(event) => setRequest(event.target.value)}
            />
          </div>

          <div>
            <button onClick={handleFormSubmit} className="btn btn-info btn-block py-3" type="submit">
              Submit your request
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