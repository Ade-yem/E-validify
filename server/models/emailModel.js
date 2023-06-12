// define email schema
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Schema = mongoose.Schema;
const EmailSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  details: {
    type: Object,
    required: true,
    validated: {
      type: Boolean,
      default: false
    },
    validated_at: {
      type: Date,
      default: Date.now
    }
  }
});
const Email = mongoose.model('Email', EmailSchema);
module.exports = Email;
