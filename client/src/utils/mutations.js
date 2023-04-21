import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_REQUEST = gql`
  mutation addRequest($requestItem: String!, $requestDescription: String!, $location: String!) {
    addRequest(requestItem: $requestItem, requestDescription:  $requestDescription, location: $location) {
      _id
      requestItem
      requestDescription
      location
      requestBy
      postedOn
      comments {
        _id
        commentText
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const UPDATE_REQUEST = gql`
  mutation updateRequest($requestId: String!) {
    updateRequest(requestId: $requestId) {
      _id
      requestItem
      requestDescription
      location
    }
  }
`;

export const REMOVE_REQUEST = gql`
  mutation removeRequest($requestId: String!) {
    removeRequest(requestId: $requestId) {
      _id
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($requestId: String!, $commentText: String!) {
    addComment(requestId: $requestId, commentText: $commentText) {
      _id
      requestItem
      requestDescription
      location
      requestBy
      postedOn
      comments {
        _id
        commentText
        commentBy
        postedOn
      }
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment($commentId: String!, $commentText: String!) {
    updateComment(commentId: $commentId, commentText: $commentText) {
      _id
      requestItem
      requestDescription
      location
      requestBy
      postedOn
      comments {
        _id
        commentText
        commentBy
        postedOn
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($commentId: String!) {
    removeComment(commentId: $commentId) {
      _id
    }
  }
`;