// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// //Inport the 'useMutation()' hook from Apollo Client
// import { useMutation } from '@apollo/client';
// // import { QUERY_REQUESTS } from '../../utils/queries';

// //Import the GraphQL mutation
// import { ADD_REQUEST } from '../../utils/mutations';
// // import Auth from '../../utils/auth';
// import Auth from '../../utils/auth';

// const RequestForm = ({ requestItem, requestDescription, location  }) => {
//   const [request, setRequest] = useState('');

//   //Invoke 'useMutation()' hook to return a promise-based function and data about the ADD_REQUEST
//   const [addRequest, { error }] = useMutation(ADD_REQUEST);
 
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
  
//     // Get the values entered by the user in the input fields
//     const item = event.target.item.value;
//     const description = event.target.description.value;
//     const location = event.target.location.value;
  
//     // Since mutation function is async, wrap in try...catch to catch any network error
//     try {
//       // Execute mutation and pass in the values entered by the user as variables
//       const { data } = await addRequest({
//         variables: { item, description, location },
//       });
  
//       setRequest('');
//     } catch (err) {
//       console.error(err);
//     }
//   };
  
//   // const handleFormSubmit = async (event) => {
//   //   event.preventDefault();

//   //   //Since mutation function is async, wrap in try...catch to catch any network error
//   //   try {
//   //     //Execute mutation and pass in defined parameter data as variables
//   //     const data = await addRequest({
//   //       variables: { requestItem, requestDescription, location },
//   //     });

//   //     setRequest('');
//   //   } catch (err) {
//   //     console.error(err);
//   //   }
//   // };

//   return (
//     <div>
//       <h1> Add Your Requests Here </h1>

//       {Auth.loggedIn() ? (
//         <form onSubmit={handleFormSubmit}>
//           <div>

//           <label> <h3> Requested Item : </h3> </label>
// <input
//   placeholder="Type your request."
//   type="text"
//   name="item"
//   onChange={(event) => setRequest(event.target.value)}
// />

// <label> <h3> Description of Item : </h3>  </label>
// <input
//   placeholder="Type the description."
//   type="text"
//   name="description"
//   onChange={(event) => setRequest(event.target.value)}
// />

// <label> <h3> Location for Delivery : </h3>  </label>
// <input
//   placeholder="Type your city and state."
//   type="text"
//   name="location"
//   onChange={(event) => setRequest(event.target.value)}
// />

//           {/* <label> <h3> Requested Item : </h3> </label>
//             <input
//               placeholder="Type your request."
//               type = "text"
//               value={request.requestItem }
//               onChange={(event) => setRequest(event.target.value)}
//             />
//             <label> <h3> Description of Item : </h3>  </label>
//             <input
//               placeholder="Type the description."
//               type = "text"
//               value={ request.requestDescription }
//               onChange={(event) => setRequest(event.target.value)}
//             />
//               <label> <h3> Location for Delivery : </h3>  </label>
//             <input
//               placeholder="Type your city and state."
//               type = "text"
//               value={ request.location }
//               onChange={(event) => setRequest(event.target.value)}
//             /> */}
//           </div>

//           <div>
//             <button onClick={handleFormSubmit} className="btn btn-info btn-block py-3" type="submit">
//               Submit your request
//             </button>
//           </div>
//           {error && (
//             <div className="col-12 my-3 bg-danger text-white p-3">
//               {error.message}
//             </div>
//           )}
//         </form>
//       ) : (
//         <p>
//           You need to be logged in to add a request. Please{' '}
//           <Link to="/signup">login.</Link>
//         </p>
//       )}
//     </div>
//   );
//       }; 
// export default RequestForm;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_REQUEST } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { QUERY_REQUESTS, QUERY_ME } from '../../utils/queries';

const RequestForm = () => {
<<<<<<< HEAD
  const [requestItem, setRequestItem] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [location, setLocation] = useState('');
  const [response, setResponse] = useState(null);

  const [addRequest, { error }] = useMutation(ADD_REQUEST, {
    onCompleted: (data) => {
      setResponse(data.addRequest);
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addRequest({
        variables: { requestItem, requestDescription, location },
      });
=======
  
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
      // const { me } = cache.readQuery({ query: QUERY_ME });
      // cache.writeQuery({
      //   query: QUERY_ME,
      //   data: { me: { ...me, requests: [...me.requests, addRequest] } },
      // });
    },
  });
 

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log(item);
    console.log(location);
    console.log(description);
    console.log(Auth.getProfile().data.email);
    //Since mutation function is async, wrap in try...catch to catch any network error
    try {
      //Execute mutation and pass in defined parameter data as variables
      const data = await addRequest({
        variables: { 
          requestItem: item,
          requestDescription: description,
          location: location,
          requestBy: Auth.getProfile().data.email,
        },
      });

      setItem('');
      setDescription('');
      setLocation('');
>>>>>>> main
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Add Your Requests Here</h1>

      {Auth.loggedIn() ? (
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>
              <h3>Requested Item:</h3>
            </label>
            <input
              placeholder="Type your request."
              type="text"
              value={requestItem}
              onChange={(event) => setRequestItem(event.target.value)}
            />
            <label>
              <h3>Description of Item:</h3>
            </label>
            <input
              placeholder="Type the description."
              type="text"
              value={requestDescription}
              onChange={(event) => setRequestDescription(event.target.value)}
            />
            <label>
              <h3>Location for Delivery:</h3>
            </label>
            <input
              placeholder="Type your city and state."
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>

          <div>
            <button className="btn btn-info btn-block py-3" type="submit">
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

      {response && (
        <div>
          <h2>Response:</h2>
          <p>{JSON.stringify(response)}</p>
        </div>
      )}
    </div>
    {Auth.loggedIn() ? (
      <form onSubmit={handleFormSubmit} style={{ border: "2px solid #fff", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px", borderRadius: "25px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", padding: "30px", width: "80%", maxWidth: "600px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "30px", width: "100%" }}>
          <label style={{ marginTop: "1px", fontWeight: "bold", color: "white" }}>Requested Item:</label>
          <input
            placeholder="Type your request."
            type="text"
            value={item}
            onChange={(event) => setItem(event.target.value)}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", marginTop: "10px", marginBottom: "20px" }}
          />
          <label style={{ marginTop: "30px", fontWeight: "bold", color: "white"}}>Description of Item:</label>
          <input
            placeholder="Type the description."
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", marginTop: "10px", marginBottom: "20px" }}
          />
          <label style={{ marginTop: "30px", fontWeight: "bold", color: "white" }}>Location for Delivery:</label>
          <input
            placeholder="Type your city and state."
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", marginTop: "10px", marginBottom: "20px" }}
          />
        </div>

        <div style={{ marginTop: "30px", width: "100%", }}>
          <button onClick={handleFormSubmit} className="btn btn-info btn-block py-3" type="submit" style={{ backgroundColor: "rgb(255, 106, 0)", color: "#fff", borderRadius: "15px", border: "none", padding: "10px 20px", fontWeight: "bold", cursor: "pointer", width: "100%" }}>
            Submit your request
          </button>
        </div>

        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3" style={{ borderRadius: "5px", marginTop: "20px" }}>
            {error.message}
          </div>
        )}
      </form>
    ) : (
      <p>
        You need to be logged in to add a request. Please <Link to="/signup">login.</Link>
      </p>
    )}
  </div>
</div>

  );
};

export default RequestForm;
