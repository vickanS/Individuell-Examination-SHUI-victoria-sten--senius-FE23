// Import the configured DynamoDB instance from the db.js file
const { db } = require('../../services/db');

// Import functions to send responses and errors (likely custom utility functions)
const { sendResponse, sendError } = require('../../responses');

// Import UUID library to generate unique IDs for each message
const { v4: uuidv4 } = require('uuid');

// Export an asynchronous function that handles creating a message in DynamoDB
module.exports.createMessage = async (event) => {
    try {
        // Parse the event body (data from the request), which should contain username and text
        const { username, text } = JSON.parse(event.body);

        // Generate a unique ID for the new message using UUID
        const id = uuidv4();

        // Get the current date and time in ISO format, used as the message's timestamp
        const createdAt = new Date().toISOString();

        // Define the parameters for the DynamoDB put operation, specifying the table and item data
        const params = {
            TableName: 'MessagesTable-dev',  // DynamoDB table where the message will be stored
            Item: {
                id: id,                     // Unique message ID
                username: username.trim(),   // Clean up the username by trimming whitespace
                text: text.trim(),           // Clean up the text by trimming whitespace
                createdAt: createdAt,        // Timestamp of when the message was created
            }
        };

        // Log the params to the console for debugging purposes
        console.log('DynamoDB put params:', params); 

        // Execute the put operation to insert the message into DynamoDB
        const result = await db.put(params).promise();
        
        // Log the result of the put operation to confirm success or troubleshoot issues
        console.log('DynamoDB put result:', result); 

        // Return a successful response with the message item as a JSON object
        return sendResponse(params.Item);
    } catch (error) {
        // Log the error to the console for debugging
        console.error('Error creating message:', error);

        // Return an error response with a 500 status code and a message indicating a failure
        return sendError(500, 'Error creating message');
    }
};