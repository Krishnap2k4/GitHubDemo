const express = require('express');
const mongoose = require('mongoose');
const ExcelJS = require('exceljs');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ngo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Define a schema
const dataSchema = new mongoose.Schema({
  // Define your schema fields here
  // For example:
  name: String,
  email: String,
  // Add more fields as needed
});

// Create a model based on the schema
const Data = mongoose.model('Data', dataSchema);

// Define a route to fetch all data from MongoDB and export it as an Excel file
app.get('/excell', async (req, res) => {
  try {
    const allData = await Data.find();
    
    // Create a new Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Define headers
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      // Add more headers as needed
    ];

    // Add data rows
    allData.forEach(data => {
      worksheet.addRow(data);
    });

    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');

    // Write the workbook to the response
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Internal Server Error');
  }
});