const { AuthenticationError } = require('apollo-server-express');
const { User, Request } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('requests');
    },

    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('requests');
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('requests');
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    requests: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Request.find(params).sort({ postedOn: -1 });
    },

    request: async (parent, { requestId }) => {
      return Request.findOne({ _id: requestId })
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      console.log(user)
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user.id, args, {
          new: true,
        });
      }

      throw new AuthenticationError('Not logged in');
    },


    addRequest: async (parent, { requestItem, requestDescription, location, requestBy }, context) => {
      if (context.user) {
        const request = await Request.create({
          requestItem,
          requestDescription,
          location,
          requestBy: context.user.email,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { requests: request._id } }
        );

        return request;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    updateRequest: async (parent, { requestId, requestItem, requestDescription, location, reserved, fulfilled }) => {
      if (context.user) {
      return Request.findByIdAndUpdate(
        {_id: requestId},
        {requestItem, requestDescription, location, reserved, fulfilled},
        {new: true}
      )}
      throw new AuthenticationError('You need to be logged in!');
    },

    removeRequest: async (parent, { requestId }, context) => {
      if (context.user) {
        const request = await Request.findOneAndDelete({
          _id: requestId,
          requestBy: context.user.username,
        });
        
        await User.findByIdAndUpdate(
          { _id: context.user._id},
          { $pull: { requests: request._id}}
        );
        return request;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  
    addComment: async (parent, { requestId, commentText }, context) => {
      if (context.user) {
        return Request.findOneAndUpdate(
          { _id: requestId },
          {
            $addToSet: {
              comments: { commentText, commentedBy: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  
    updateComment: async (parent, { commentId, commentText }) => {
      if (context.user) {
      return Request.findByIdAndUpdate(
        {_id: commentId},
        {commentText},
        {new: true}
      )}
      throw new AuthenticationError('You need to be logged in!');
    },

    removeComment: async (parent, { requestId, commentId }, context) => {
      if (context.user) {
        return Request.findOneAndUpdate(
          { _id: requestId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentedBy: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  
  }};

module.exports = resolvers;
