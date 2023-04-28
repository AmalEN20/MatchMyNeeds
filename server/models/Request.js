const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const requestSchema = new Schema({
  requestItem: {
    type: String,
    required: 'What item do you need?',
    minlength: 1,
    maxlength: 100,
    trim: true,
  },
  requestDescription: {
    type: String,
    required: 'Please provide a detailed description of the item.',
    minlength: 1,
    maxlength: 500,
    trim: true,
  },
  location: {
    type: String,
    required: 'Please provide the city+state or zipcode of your location.',
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
  reserved: {
    type: Boolean,
    required: true,
    default: false
  },
  fulfilled: {
    type: Boolean,
    required: true,
    default: false
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentedBy: {
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