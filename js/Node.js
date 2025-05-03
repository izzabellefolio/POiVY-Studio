require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// POST endpoint to send emails
app.post('/send-email', async (req, res) => {
  const { userEmail, ownerEmail, bookingDetails } = req.body;

  // Configure the email transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or another email service
    auth: {
      user: process.env.EMAIL_USER, // Use environment variable for email
      pass: process.env.EMAIL_PASS  // Use environment variable for password
    }
  });

  // Email to the user
  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Booking Confirmation - POiVY Studio',
    html: `
      <h1>Booking Confirmation</h1>
      <p>Thank you for booking with POiVY Studio!</p>
      <p><strong>Service:</strong> ${bookingDetails.service}</p>
      <p><strong>Date:</strong> ${bookingDetails.date}</p>
      <p><strong>Price:</strong> ${bookingDetails.price}</p>
      <p>We look forward to serving you!</p>
    `
  };

  // Email to the owner
  const ownerMailOptions = {
    from: process.env.EMAIL_USER,
    to: ownerEmail,
    subject: 'New Booking Received - POiVY Studio',
    html: `
      <h1>New Booking Received</h1>
      <p>A new booking has been made:</p>
      <p><strong>Name:</strong> ${bookingDetails.name}</p>
      <p><strong>Email:</strong> ${bookingDetails.email}</p>
      <p><strong>Service:</strong> ${bookingDetails.service}</p>
      <p><strong>Date:</strong> ${bookingDetails.date}</p>
      <p><strong>Price:</strong> ${bookingDetails.price}</p>
    `
  };

  try {
    // Send emails to both the user and the owner
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(ownerMailOptions);
    res.status(200).send('Emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).send('Failed to send emails');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});