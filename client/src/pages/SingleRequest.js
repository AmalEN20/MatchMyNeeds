import React, { useState } from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

import { QUERY_SINGLE_REQUEST } from "../utils/queries";
import Auth from "../utils/auth";
import { UPDATE_REQUEST } from "../utils/mutations";
import HandleDelete from "../components/DltRequestBtn/DeleteBtn";
import "../components/HeroSection/HeroSection"

const SingleRequest = () => {
  // Use `useParams()` to retrieve value of the route parameter `:requestId`
  const { requestId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_REQUEST, {
    // pass URL parameter
    variables: { requestId: requestId },
  });

  const request = data?.request || {};

  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const [updateRequest] = useMutation(UPDATE_REQUEST);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleItemEdits = async (event) => {
    event.preventDefault();

    try {
      const data = await updateRequest(
        {
        variables: {
          requestId: requestId,
          requestItem: item,
        },
      },
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDescriptionEdits = async (event) => {
    event.preventDefault();

    try {
      const data = await updateRequest({
        variables: {
          requestId: requestId,
          requestDescription: description,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLocationEdits = async (event) => {
    event.preventDefault();

    try {
      const data = await updateRequest({
        variables: {
          requestId: requestId,
          location: location,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="hero-container">
            <img src='/back/back4.jpeg' alt='backimg'/>

      {Auth.getProfile().data.email === request.requestBy ? (
        <div className="my-3">
          <div className="card-header bg-dark text-light p-2 m-0">
            <blockquote
              className="p-4"
              style={{
                fontSize: "1.5rem",
                fontStyle: "italic",
                lineHeight: "1.5",
              }}
            >
              {request.requestItem}
            </blockquote>
            <span style={{ fontSize: "1rem" }}>
              <strong>You </strong>
              requested this item on {request.postedOn}.
            </span>
            <br></br>
            <br></br>
            <form onSubmit={handleItemEdits}>
              <div>
                <label>Item: </label>
                <input
                  placeholder={request.requestItem}
                  type="text"
                  value={item}
                  onChange={(event) => setItem(event.target.value)}
                />
              </div>
              <div>
                <button onClick={handleItemEdits} type="submit">
                  Edit Item
                </button>
              </div>
            </form>
            <br></br>
            <form onSubmit={handleDescriptionEdits}>
              <div>
              <label>Description: </label>
              <input
                placeholder={request.requestDescription}
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              </div>
              <div>
              <button onClick={handleDescriptionEdits} type="submit">
                Edit Description
              </button>
              </div>
            </form>
              <br></br>
            <form onSubmit={handleLocationEdits}>
              <div>
              <label>Location: </label>
              <input
                placeholder={request.location}
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
              </div>
              <div>
              <button onClick={handleLocationEdits} type="submit">
                Edit location
              </button>
              </div>
            </form>
          </div>
          <br></br>
          <HandleDelete />

          <div className="my-5">
            <CommentList comments={request.comments} />
          </div>
          <div className="m-3 p-4" style={{ border: "1px dotted #1a1a1a" }}>
            <CommentForm requestId={request._id} />
          </div>
        </div>
      ) : (
        <div className="my-3">
          <div className="card-header bg-dark text-light p-2 m-0">
            <blockquote
              className="p-4"
              style={{
                fontSize: "1.5rem",
                fontStyle: "italic",
                lineHeight: "1.5",
              }}
            >
              {request.requestItem}
            </blockquote>
            <span style={{ fontSize: "1rem" }}>
              <strong>{request.requestBy} </strong>
              requested this item on {request.postedOn}.
            </span>
            <h3>Item: </h3>
            <h4>{request.requestItem}</h4>
            <h3>Description: </h3>
            <h4>{request.requestDescription}</h4>
            <h3>Location: </h3>
            <h4>{request.location}</h4>
          </div>

          <div className="my-5">
            <CommentList comments={request.comments} />
          </div>
          <div className="m-3 p-4" style={{ border: "1px dotted #1a1a1a" }}>
            <CommentForm requestId={request._id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleRequest;
