import React from 'react';
import { Link } from 'react-router-dom';

const RequestPosts = ({requests}) => {

if (!requests.length) {
  return <h3>No Requests Yet</h3>
}

  return (
    <div>
      {requests &&
        requests.map((request) => (
          <div key={request._id}>
          <Link
                  to={`/requests/${request._id}`}
                >
          <div>
            <h4>Requested Item: {request.requestItem}</h4>
            <h5>Description: {request.requestDescription}</h5>
          </div>
          </Link>
          </div>
        ))}
    </div>
  );
};

export default RequestPosts;