const mongoose = require('mongoose');

// Define the volunteer schema
mongoose.connect("mongodb://127.0.0.1:27017/ngo");
const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNo: {
    type: String,
    required: true
  },
  agegrp:{
    type: String,
    required: true,
  },
  adhaarNo: {
    type: String,
    required: true,
    unique: true
  }
  
});

// Create the Volunteer model
module.exports = mongoose.model('volunteer', volunteerSchema);