import React from "react";
import RequestPosts from "../components/AllRequests/index";
import { useQuery } from "@apollo/client";
import { QUERY_REQUESTS } from "../utils/queries";

function AllRequests() {
  const divStyles = {
    boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.2)',

  };
  const { loading, data } = useQuery(QUERY_REQUESTS);
  const requests = data?.requests || [];

  return (
    // <div style={divStyles}>
    <>
      {loading ? <div>Loading...</div> : 
          <div className='hero-container'>
      
          <img src='/back/back4.jpeg' alt='backimg'/>
       <div>

        
       <div>

         <h1 style={{ color: 'White', fontSize: '3rem', fontWeight: 'bold', textAlign: "center", marginTop:'-200px' }}className="request">

           All Requests
         </h1>

       </div>


       <div>
         <RequestPosts requests={requests} />
       </div>

     </div>
     </div> }
     
    </>
    // </div>
  );
}

export default AllRequests;
