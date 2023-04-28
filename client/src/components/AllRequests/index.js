import React from 'react';
import { Link } from 'react-router-dom';

const RequestPosts = ({requests}) => {

if (!requests.length) {
  return <h3>No Requests Yet</h3>
}
const styles = {
  request: {
    marginBottom: '20px',
    border: '1px solid white',
    padding: '10px'
  },
  link: {
    textDecoration: 'none'
  },
  title: {
    marginBottom: '5px'
  },
  description: {
    marginTop: '0',
    color: 'gray'
  }
};

return (
  <div style={{ 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }}>
    {requests &&
      requests.map((request) => (
        <div key={request._id} style={styles.request}>
          <Link
            to={`/requests/${request._id}`}
            style={styles.link}
          >
            <div>
              <h4 style={styles.title}>Requested Item: {request.requestItem}</h4>
              <h5 style={styles.description}>Description: {request.requestDescription}</h5>
            </div>
          </Link>
        </div>
      ))}
  </div>
); 

};

export default RequestPosts;