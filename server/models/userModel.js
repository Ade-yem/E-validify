// user schema for mongoDB containing a list of emails
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: { type: String, required: true },
  emails: [{
    email: {
      type: String
    },
    details: {
      type: Schema.Types.Mixed
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
