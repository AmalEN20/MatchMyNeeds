import React from "react";
import RequestPosts from "../components/AllRequests/index";
import { useQuery } from "@apollo/client";
import { QUERY_REQUESTS } from "../utils/queries";

function AllRequests() {
  const { loading, data } = useQuery(QUERY_REQUESTS);
  const requests = data?.requests || [];

  return (
    <>
      {loading ? <div>Loading...</div> : 
          <div className='hero-container'>
      
          <img src='/back/back4.jpeg' alt='backimg'/>
       <div>

        
       <div>
         <h1 style={{
          color: 'white',
          marginLeft: '21%',
          marginTop: '100px'
         }}>
           All Requests
         </h1>
       </div>


       <div>
         <RequestPosts requests={requests} />
       </div>

     </div>
     </div> }
    </>
  );
}

export default AllRequests;
