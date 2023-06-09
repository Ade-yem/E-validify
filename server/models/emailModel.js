// define email schema
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const Schema = mongoose.Schema;
const EmailSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    details: {
        type: Object,
        required: true
    }
});
const Email = mongoose.model("Email", EmailSchema);
module.exports = Email;