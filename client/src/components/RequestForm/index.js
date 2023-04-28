import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//Inport the 'useMutation()' hook from Apollo Client
import { useMutation } from '@apollo/client';
// import { QUERY_REQUESTS } from '../../utils/queries';

//Import the GraphQL mutation
import { ADD_REQUEST } from '../../utils/mutations';
// import Auth from '../../utils/auth';
import Auth from '../../utils/auth';
import { QUERY_REQUESTS, QUERY_ME } from '../../utils/queries';

const RequestForm = () => {

  const [ item, setItem ] = useState('');
  const [ description, setDescription] = useState('');
  const [ location, setLocation ] = useState('');

  //Invoke 'useMutation()' hook to return a promise-based function and data about the ADD_REQUEST
  const [addRequest, { error }] = useMutation(ADD_REQUEST, {
    update(cache, { data: { addRequest } }) {
      try {
        const { requests } = cache.readQuery({ query: QUERY_REQUESTS });

        cache.writeQuery({
          query: QUERY_REQUESTS,
          data: { requests: [addRequest, ...requests] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, requests: [...me.requests, addRequest] } },
      });
    },
  });
 

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log(item);
    console.log(location);
    console.log(description);
    //Since mutation function is async, wrap in try...catch to catch any network error
    try {
      //Execute mutation and pass in defined parameter data as variable
      const data = await addRequest({
        variables: { 
          requestItem: item,
          requestDescription: description,
          location: location,
          requestBy: Auth.getProfile().data.username,
        },
      });

      setItem('');
      setDescription('');
      setLocation('');

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
              value={item }
              onChange = { (e) => setItem(e.target.value)}
            />
            <label> <h3> Description of Item : </h3>  </label>
            <input
              placeholder="Type the description."
              type = "text"
              value={ description }
              onChange= { (e) => setDescription(e.target.value)}
            />
              <label> <h3> Location for Delivery : </h3>  </label>
            <input
              placeholder="Type your city and state."
              type = "text"
              value={ location }
              onChange= { (e) => setLocation(e.target.value)}
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