import React from 'react';
import { Link } from 'react-router-dom';

const RequestPosts = ({requests}) => {

if (!requests.length) {
  return <h3>No Requests Yet</h3>
}

return (
  <div style={{
     display: 'flex'
  }}>
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    lineHeight: '1.5',
    width: '300px',
    height: '900px',
    maxWidth: '90%',
    margin: '0 auto',
    justifyContent: 'space-between',
    flexDirection: 'column',
    transition: 'transform 200ms easy-in'
  }}>
  <div style={{
    width: '1100px',
    maxWidth: '100%',
    margin: '0 auto',
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
              padding: '10px 20px',
              opacity: '0.8',
            }}>
              <h4 style={{
                fontSize: '1.3rem',
                textTransform: '',
                margin: '10px 0',
                color: 'white'
              }}>Requested Item: {request.requestItem}</h4>
              <h5
              style={{
                color: 'white'
              }}>Description: {request.requestDescription}</h5>
            </div>
          </Link>
        </div>
      ))}
  </div>
  </div>
  </div>
);
};

export default RequestPosts;