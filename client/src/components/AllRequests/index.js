import React from 'react';
import { Link } from 'react-router-dom';

const RequestPosts = ({
  requests,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!requests.length) {
    return <h3>No Requests Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {requests &&
        requests.map((request) => (
          <div key={request._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${request.requestBy}`}
                >
                  {request.requestBy} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this thought on {request.postedOn}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this thought on {request.postedOn}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{request.requestItem}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${request._id}`}
            >
              Join the discussion on this thought.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default RequestPosts;