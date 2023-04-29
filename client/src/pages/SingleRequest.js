import React from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

import { QUERY_SINGLE_REQUEST } from "../utils/queries";

const SingleRequest = (
  requestBy,
  requestDescription,
  requestItem,
  location,
  postedOn
) => {
  // Use `useParams()` to retrieve value of the route parameter `:requestId`
  const { requestId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_REQUEST, {
    // pass URL parameter
    variables: { requestId: requestId },
  });

  const request = data?.request || {};

  console.log(requestId);
  console.log(request);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <div className="card-header bg-dark text-light p-2 m-0">
        {request.requestBy} <br />
        <span style={{ fontSize: "1rem" }}>
          had this request on {request.postedOn}
        </span>
        <h3>{request.requestItem}</h3>
        <h3>{request.requestDescription}</h3>
        <h3>{request.location}</h3>
      </div>
      <h3>{request.request}</h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: "1.5rem",
            fontStyle: "italic",
            border: "2px dotted #1a1a1a",
            lineHeight: "1.5",
          }}
        >
          {request.requestItem}
        </blockquote>
      </div>

      <h3> {request.request} </h3>
      <div className="my-5">
        <CommentList comments={request.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: "1px dotted #1a1a1a" }}>
        <CommentForm requestId={request._id} />
      </div>
    </div>
  );
};

export default SingleRequest;
