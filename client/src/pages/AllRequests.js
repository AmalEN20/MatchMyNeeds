import React from "react";
import RequestPosts from "../components/AllRequests";
import { useQuery } from "@apollo/client";
import { QUERY_REQUESTS } from "../utils/queries";

function AllRequests() {
  const { loading, data } = useQuery(QUERY_REQUESTS);
  const requests = data?.requests || [];

  return (
    <>
      {loading ? <div>Loading...</div> : 
       <div>
       <div>
         <h1 className="request">
           All Requests
         </h1>
       </div>
       <div>
         <RequestPosts requests={requests} />
       </div>

     </div> }
    </>
  );
}

export default AllRequests;
