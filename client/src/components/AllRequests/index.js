import React from 'react';
import { Link } from 'react-router-dom';

const RequestPosts = ({requests}) => {

if (!requests.length) {
  return <h3>No Requests Yet</h3>
}

return (
  <div style={{ 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }}>
    {requests &&
      requests.map((request) => (
        <div key={request._id} style={{
          marginBottom: '20px',
          border: '1px solid black',
          padding: '10px'
        }}>
          <Link
            to={`/requests/${request._id}`}
            style={{
              textDecoration: 'none'
            }}
          >
            <div>
              <h4 style={{
                marginBottom: '5px'
              }}>Requested Item: {request.requestItem}</h4>
              <h5 style={{
                marginTop: '0',
                color: 'gray'
              }}>Description: {request.requestDescription}</h5>
            </div>
          </Link>
        </div>
      ))}
  </div>
);
};

export default RequestPosts;