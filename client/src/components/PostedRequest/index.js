import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_REQUEST } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const RequestsList = ({ requests, isLoggedInUser = false }) => {
  const [removeRequest, { error }] = useMutation(REMOVE_REQUEST, {
    update(cache, { data: { removeRequest } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removeRequest },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleRemoveRequest = async (request) => {
    try {
      // const { data } = 
      await removeRequest({
        variables: { request },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!requests.length) {
    return <h3>No requests Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {requests &&
          requests.map((request) => (
            <div key={request} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{request}</span>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemoveRequest(request)}
                    >
                      X
                    </button>
                  )}
                </h4>
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default RequestsList;
