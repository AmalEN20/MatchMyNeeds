const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    requests: [Request]
  }

  type Request {
    _id: ID
    requestItem: String
    requestDescription: String
    location: String
    requestBy: String
    postedOn: String
    reserved: Boolean
    fulfilled: Boolean
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    commentedBy: String
    postedOn: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(username: String!): User
    requests(username: String): [Request]
    request(requestId: ID!): Request
    me: User
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
    ): Auth
    login(
      email: String!
      password: String!
    ): Auth
    updateUser(
      username: String
      email: String
      password: String
    ): User
    addRequest(
      requestItem: String!
      requestDescription: String!
      location: String!
      requestBy: String
    ): Request
    updateRequest(
      requestId: ID!
      requestItem: String
      requestDescription: String
      location: String
      reserved: Boolean
      fulfilled: Boolean
    ): Request
    addComment(
      requestId: String!
      commentText: String!
    ): Request
    updateComment(
      commentId: ID!
      commentText: String!
    ): Request
    removeRequest(
      requestId: ID!
    ): Request
    removeComment(
      requestId: ID!
      commentId: ID!
    ): Request
  }
`;

module.exports = typeDefs;
