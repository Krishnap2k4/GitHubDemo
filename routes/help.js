const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/ngo");

// Define the schema for the Help model
const helpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  adharNo: {
    type: String,
    required: true,
    unique: true // Assuming Aadhar number should be unique
  },
  address: {
    type: String,
    required: true
  },
  agegrp: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps to documents

// Create a model using the schema
module.exports  = mongoose.model('help', helpSchema);