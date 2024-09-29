const { db } = require('../../services/db');
const { sendResponse, sendError } = require('../../responses');

module.exports.updateMessage = async (event) => {
    const { id } = event.pathParameters; // Extract ID from the request path
    console.log('Received ID from path:', id);

    const { username, text, createdAt } = JSON.parse(event.body); // Parse request body
    console.log('Received body:', { username, text, createdAt });

    try {
        // Parameters for retrieving the existing message from DynamoDB
        const getParams = {
            TableName: 'MessagesTable-dev',
            Key: { id: id }, // Lookup based on message ID
        };

        console.log('Get parameters:', getParams);
        const getResult = await db.get(getParams).promise(); // Fetch the message
        if (!getResult.Item) {
            console.log('Message not found in DynamoDB');
            return sendError(404, 'Message not found'); // Return error if no message found
        }

        // Parameters for updating the message in DynamoDB
        const params = {
            TableName: 'MessagesTable-dev',
            Key: { id: id }, // Identify the message by ID
            UpdateExpression: 'set username = :u, #columntext = :t, createdAt = :c', // Update username, text, and createdAt
            ExpressionAttributeNames: {
                "#columntext": "text", // Dynamically reference 'text' since it's a reserved word in DynamoDB
            },
            ExpressionAttributeValues: {
                ':u': username.trim(), // New username
                ':t': text.trim(), // New message text
                ':c': createdAt // New creation timestamp
            },
            ReturnValues: 'ALL_NEW', // Return the updated message
        };

        const updateResult = await db.update(params).promise(); // Perform the update operation
        console.log('Update result:', updateResult);

        return sendResponse(updateResult.Attributes); // Send the updated message back to the client
    } catch (error) {
        console.error('Update error:', error);
        return sendError(500, 'Error updating message'); // Return error if update fails
    }
};
