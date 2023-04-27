import React from 'react';

const RequestPosts = ({requests}) => {

if (!requests.length) {
  return <h3>No Requests Yet</h3>
}

  return (
    <div>
      {requests &&
        requests.map((request) => (
          <div>
            <h4>Request: {request.requestItem}</h4>
          </div>
        ))}
    </div>
  );
};

export default RequestPosts;