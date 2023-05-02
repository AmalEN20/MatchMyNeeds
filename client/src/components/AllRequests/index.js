import React from 'react';
import { Link } from 'react-router-dom';

const RequestPosts = ({requests}) => {
  

if (!requests.length) {
  return <h3>No Requests Yet</h3>
}

return (
  <div style={{

    display: 'flex',
    lineHeight: '1.5',
    width: '400px',
    height: '900px',
    maxWidth: '90%',
    margin: '0 auto',
  }}>
  <div style={{
    width: '1100px',
    maxWidth: '100%',
    margin: '20px auto',
  }}>
    {requests &&
      requests.map((request) => (
        <div key={request._id} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link
            to={`/requests/${request._id}`} >
            <div style={{
              flex: '1 0 21rem',
              margin: '10px 20px',
              background: 'black',
              boxShadow: '0 0 15px black',
              padding: '20px 20px',
              opacity: '0.8',
              display: 'flex'
            }}>
              <h4 style={{
                fontSize: '1.2rem',
                
                margin: '20px 0px',
                color: 'white'
              }}>Requested Item: {request.requestItem}</h4>
              <h5
              style={{
                margin: '20px 1px',
                color: 'white'
              }}>Description: {request.requestDescription}</h5>
            </div>
          </Link>
        </div>
      ))}
  </div>
  </div>
);
};

export default RequestPosts;