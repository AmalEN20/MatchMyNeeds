import React from 'react';
import { useQuery } from '@apollo/client';

import PostedRequest from '../components/PostedRequest';

import { QUERY_REQUESTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_REQUESTS);
  const request = data?.requests || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostedRequest
              requests={request}
              title="Here's the current list of requests..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
