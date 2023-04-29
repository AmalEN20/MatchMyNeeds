import React from 'react';
import { Link } from 'react-router-dom';

const RequestPosts = ({requests}) => {

if (!requests.length) {
  return <h3>No Requests Yet</h3>
}

return (
  <div style={{ 
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifycontent: 'space-around',
  }}>
    {requests &&
      requests.map((request) => (
        <div key={request._id} style={{
          
          border: '2px solid white',
          borderRadius: "25px",
          padding: '20px',
          width: '30%',


        }}>
          <Link
            to={`/requests/${request._id}`}
            style={{
              color: 'white'
            }}
          >
            <div>
              <h4 style={{
                marginBottom: '5px'
              }}>Requested Item: {request.requestItem}</h4>
              <h5 style={{
                marginTop: '0',
                color: 'white'
              }}>Description: {request.requestDescription}</h5>
            </div>
          </Link>
        </div>
      ))}
  </div>
);
};

export default RequestPosts;