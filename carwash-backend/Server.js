// carwash-backend/server.js

require('dotenv').config(); // Load environment variables from .env file immediately
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the CORS middleware

const app = express();
const PORT = process.env.PORT || 5000; // Server will run on port 5000 by default

// Middleware
app.use(express.json()); // Parses incoming requests with JSON payloads
// This middleware is crucial for the SMS API as it often expects URL-encoded data
app.use(express.urlencoded({ extended: true })); // Added to handle URL-encoded form data
app.use(cors()); // Enable CORS for all routes - IMPORTANT for your React app to connect

// --- Environment Variables (for sensitive data) ---
// These should be set in your .env file, NOT directly in this code.
const AFRIKA_TALKING_API_KEY = process.env.AFRIKA_TALKING_API_KEY;
const AFRIKA_TALKING_USERNAME = process.env.AFRIKA_TALKING_USERNAME;
// const AFRIKA_TALKING_WHATSAPP_NUMBER = process.env.AFRIKA_TALKING_WHATSAPP_NUMBER; // No longer needed for SMS API

// Africa's Talking SMS API Endpoint (Changed from WhatsApp)
const AFRIKA_TALKING_SMS_ENDPOINT = 'https://api.africastalking.com/version1/messaging';

// Optional: Define an SMS Sender ID if you have one from Africa's Talking
// This can also be set in your .env file if you wish.
const SMS_SENDER_ID = process.env.SMS_SENDER_ID || null; // Example: '22384' or 'YourApp'

// API Endpoint for your React frontend to call
// Keeping the same frontend endpoint name simplifies frontend code changes
app.post('/api/send-whatsapp', async (req, res) => {
    // 1. Get data from your React frontend
    const { phoneNumber, messageBody } = req.body;

    // Basic validation
    if (!phoneNumber || !messageBody) {
        return res.status(400).json({ error: 'Recipient phone number and message body are required.' });
    }

    // Basic check for AT credentials (only API Key and Username needed for SMS)
    if (!AFRIKA_TALKING_API_KEY || !AFRIKA_TALKING_USERNAME) {
        console.error('Africa\'s Talking API credentials (API Key or Username) not set in .env file!');
        return res.status(500).json({ error: 'Server configuration error: Africa\'s Talking SMS credentials missing.' });
    }

    try {
        // Construct the payload for the Africa's Talking SMS API
        const smsPayload = {
            username: AFRIKA_TALKING_USERNAME,
            to: phoneNumber, // For SMS, the recipient field is 'to'
            message: messageBody, // For SMS, the message field is 'message' directly
        };

        // Add sender ID if available
        if (SMS_SENDER_ID) {
            smsPayload.from = SMS_SENDER_ID; // For SMS, the sender ID field is 'from'
        }

        // 2. Make the secure request to Africa's Talking SMS API
        const response = await axios.post(
            AFRIKA_TALKING_SMS_ENDPOINT,
            // Convert the payload to URL-encoded format, which the SMS API expects
            new URLSearchParams(smsPayload).toString(),
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded', // Crucial for SMS API
                    'apiKey': AFRIKA_TALKING_API_KEY // 'apiKey' with camelCase 'Key' is standard for SMS API headers
                }
            }
        );

        // 3. Send Africa's Talking's response back to your React frontend
        console.log('SMS sent response from Africa\'s Talking:', response.data);
        res.json(response.data);

    } catch (error) {
        console.error('Error sending SMS via Africa\'s Talking:', error.response ? error.response.data : error.message);
        // Send a meaningful error message back to the frontend
        res.status(error.response?.status || 500).json({
            error: 'Failed to send SMS message via Africa\'s Talking.', // Changed error message
            details: error.response?.data || error.message
        });
    }
});

// Basic route for testing if the backend is running
app.get('/', (req, res) => {
    res.send('Africa\'s Talking SMS Backend is running!'); // Changed message
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
    console.log(`Access it at http://localhost:${PORT}`);
});