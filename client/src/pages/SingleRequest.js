// import React from 'react';
// import '../../src/App.css';

// return (
//     <div>
//         <p>LOL</p>
//         <h1 className='request'> What are you looking for? </h1>
//     </div>
// );
















// export default function ToDo() {
//   return (
//     <div className='hero-container'> 
//     <h1 className='products'>To do</h1>
//     <img src='/back/back4.jpeg'/>
//   </div>) ;

  
// }




// import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';

// import ItemName from 
// import RequestForm from '../components/RequestForm';


// import { QUERY_SINGLE_REQUEST} from '../utils/queries';


// const SingleRequest = () => {

// }




// export default SingleRequest;

import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_REQUEST, QUERY_SINGLE_REQUEST } from '../utils/queries';

const SingleRequest = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { requestId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_REQUEST, {
    // pass URL parameter
    variables: { requestId: requestId },
  });

  const request= data?.request || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {request.requestAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this request on {request.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {request.requestText}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={request.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm requestId={request._id} />
      </div>
    </div>
  );
};

export default SingleRequest;
