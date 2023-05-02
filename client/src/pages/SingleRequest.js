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
      window.location.reload();
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
      window.location.reload();
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
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };


  

  return (
    <div className="hero-container">
            <img src='/back/back4.jpeg' alt='backimg'/>

      {Auth.getProfile().data.email === request.requestBy ? (
        <div className="my-5">
          <div className="card-header bg-dark text-light p-2 m-0">
            <blockquote
              className="p-4"
              style={{
                fontSize: "2rem",
                fontStyle: "italic",
                lineHeight: "1.5",
                textAlign: "center",
                borderRadius: "10px",
                margin: "13px",
                marginBottom: "-150px",

          
              }}
            >
              {request.requestItem}
            </blockquote>

          
      <div style={{ display: "flex", justifyContent: "center",borderRadius:'50px', alignItems: "center", height: "100vh" ,marginTop: "150%"}}>
        <div style={{ border: "3px solid white ", textAlign: "center",borderRadius:'50px', lineHeight: "3", width: "50%",  }}>
            <span style={{ fontSize: "1.5rem", color: "white", }}>
              You requested the item on {request.postedOn}
            </span>
            <form onSubmit={handleItemEdits}>
              <div className="my-3">
                <label style={{ fontSize: "1.2rem", fontWeight: "bold", marginRight: "1rem", display: "flex", textAlign: 'center', justifyContent: "center"}}>
                  Item:
                </label>
                <input
                  placeholder={request.requestItem}
                  type="text"
                  value={item}
                  onChange={(event) => setItem(event.target.value)}
                  style={{ fontSize: "1.4rem", padding: "0.5rem", border: "none", borderBottom: "2px solid #ccc" }}
                />
              </div>
              <div>
                <button onClick={handleItemEdits} type="submit" style={{ backgroundColor: "orange", color: "black" }}>
                  Edit Item
                </button>
              </div>
            </form>
            <br></br>
            <form onSubmit={handleDescriptionEdits}>
              <div>
              <label style={{ fontSize: "1.2rem", fontWeight: "bold", marginRight: "1rem",  justifyContent: 'center', textAlign: 'center'}}>Description: </label>
              <textarea
                placeholder={request.requestDescription}
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                style={{ fontSize: "1.1rem", padding: "0.5rem", border: "none", borderBottom: "2px solid #ccc", }}
              />
              </div>
              <div>
              <button onClick={handleDescriptionEdits} type="submit" style={{backgroundColor: "orange", color: "black", }}>
                Edit Description
              </button>
              </div>
            </form>
              <br></br>
            <form onSubmit={handleLocationEdits}>
              <div>
              <label style={{ fontSize: "1.2rem", fontWeight: "bold", marginRight: "1rem", display: "flex", textAlign:'center', justifyContent: 'center'}}>Location: </label>
              <input
                placeholder={request.location}
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                style={{ fontSize: "1.4rem", padding: "0.5rem", border: "none", borderBottom: "2px solid #ccc",  }}
              />
              </div>
              <div>
              <button onClick={handleLocationEdits} type="submit" style={{ backgroundColor: "orange", color: "black" }}>
                Edit location
              </button>
              </div>
            </form>
          </div>
        <div > 
          <HandleDelete />
        </div>

        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh",}}>
        <div style={{ border: "4px solid white", textAlign: "center", lineHeight: "3", borderRadius: "50px", marginBottom: "-10px"}}>
          <div className="my-5">
      
            <CommentList comments={request.comments} />
          </div>
          <div className="m-3 p-4" style={{ border: "1px dotted #1a1a1a",  }}>
            <CommentForm requestId={request._id} />
          </div>
          </div>
        </div>
      </div>
      ) : (
        <div className="my-3">

          <div className="card-header bg-dark text-light p-2 m-0">
            <div>
            <blockquote
              className="p-4"
              style={{
                fontSize: "1.5rem",
                fontStyle: "italic",
                lineHeight: "1.5",
                textAlign: "center",
                borderRadius: "10px",
                margin: "13px",
                marginBottom: "-150px",
              }}
            >
              {request.requestItem}
            </blockquote>
            </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", marginTop: '1000px'}}>
          <div style={{ border: "3px solid white", textAlign: "center", lineHeight: "3", borderRadius: "25px", width: "50%", marginBottom: "-50px", marginTop: "130px" }}>
            <span style={{ fontSize: "1.5rem" }}>
              <strong>{request.requestBy} </strong>
              requested this item on {request.postedOn}.
            </span>
            <h3 style={{ color: 'orange', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'underline', textAlign: "center" }}>Item:</h3>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold'}}>{request.requestItem}</h4>
            <h3 style={{ color: 'orange', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'underline', textAlign: "center", }}>Description: </h3>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', display: "flex", textAlign: "center", justifyContent: "center" }}>{request.requestDescription}</h4>
            <h3 style={{ color: 'orange', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'underline', textAlign: "center" }}>Location: </h3>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold'}}>{request.location}</h4>
          </div>
        </div>

          </div > 
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", }}>
        <div style={{ border: "2px solid white", textAlign: "center", lineHeight: "3", borderRadius: "10px", marginBottom: "100px", marginTop: "-400px", }}>
          <div className="my-5">
            <CommentList comments={request.comments} />
          </div>
          <div className="m-3 p-4" style={{ border: "5px white" }}>
            <CommentForm requestId={request._id} />
          </div>
      </div>
        </div>

        </div>
      )}
    </div>
  );
};

export default SingleRequest;
