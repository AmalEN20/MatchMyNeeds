import React, {useState} from "react";

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

  const handleChange = async (event) => {
    event.preventDefault();
      const data = await editRequest({
        variables: {
          requestItem: request.requestItem,
          requestDescription: request.requestDescription
        }
      })
 }

  return (
    <div className="my-3">
      <div className="card-header bg-dark text-light p-2 m-0">
      <blockquote
          className="p-4"
          style={{
            fontSize: "1.5rem",
            fontStyle: "italic",
            border: "2px dotted #1a1a1a",
            lineHeight: "1.5",
          }}>
            {request.requestItem}
        </blockquote>
        <strong>{request.requestBy}</strong>
        <span style={{ fontSize: "1rem" }}> had this request on {request.postedOn}
        </span>
        <h5>Item: </h5>
        <input 
        value={request.requestItem} 
        type="text"
        onChange={handleChange}/>
        <button>Edit item</button>
        <h3>Description: </h3>
        <input value={request.requestDescription}/>
        <button>Edit description</button>
        <h3>Location: </h3>
        <input value={request.location}/>
        <button>Edit location</button>
      </div>
      <br></br>
      <button>Delete request</button>
      <div className="bg-light py-4">

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
