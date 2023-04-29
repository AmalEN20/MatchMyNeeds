import React from "react";
import RequestPosts from "../components/AllRequests";
import { useQuery } from "@apollo/client";
import { QUERY_REQUESTS } from "../utils/queries";

function Post() {
  const { data } = useQuery(QUERY_REQUESTS);
  const requests = data?.requests || [];

  return (
    <div>
      <RequestPosts requests={requests} />
    </div>
  );
}

export default Post;
