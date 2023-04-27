import React from 'react';
import { Link } from 'react-router-dom';

const RequestPosts = ({requests}) => {
  if (!requests.length) {
    return <h3>No Requests Yet</h3>;
  }

  return (
    <div>
      {requests &&
        requests.map((request) => (
          <div key={request._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              Request Item: {request.requestItem}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{request.requestItem}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RequestPosts;