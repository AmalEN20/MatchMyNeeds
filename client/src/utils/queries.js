import { gql } from "@apollo/client";

export const QUERY_REQUESTS = gql`
  query getAllRequests {
    requests {
      _id
      requestItem
      requestDescription
      location
      requestBy
      postedOn
      reserved
      fulfilled
    }
  }
`;

export const QUERY_SINGLE_REQUEST = gql`
  query getSingleRequest($requestId: ID!) {
    request(requestId: $requestId) {
      _id
      requestItem
      requestDescription
      location
      requestBy
      postedOn
      reserved
      fulfilled
      comments {
        _id
        commentText
        commentedBy
        postedOn
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      username
      email
      requests {
        _id
        requestItem
        requestDescription
        location
        postedOn
        reserved
        fulfilled
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      requests {
        _id
        requestItem
        requestDescription
        location
        postedOn
        reserved
        fulfilled
      }
    }
  }
`;
