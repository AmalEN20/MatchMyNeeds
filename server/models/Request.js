const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const requestSchema = new Schema({
  requestItem: {
    type: String,
    required: 'You need to leave a thought!',
    minlength: 1,
    maxlength: 100,
    trim: true,
  },
  requestDescription: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 500,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  requestBy: {
    type: String,
    required: true,
    trim: true,
  },
  postedOn: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentBy: {
        type: String,
        required: true,
      },
      PostedOn: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Request = model('Request', requestSchema);

module.exports = Request;