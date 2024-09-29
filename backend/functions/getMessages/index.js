const { db } = require('../../services/db');
const { sendResponse, sendError } = require('../../responses');

module.exports.getMessages = async () => {
    try {
        // Parameters for the DynamoDB scan operation
        const params = {
            TableName: 'MessagesTable-dev',
            ConsistentRead: true, // Ensures the latest data is read
        };

        // Retrieve all items from the table
        const result = await db.scan(params).promise();

        // Clean up data by trimming spaces from username and text
        const messages = result.Items.map(item => ({
            ...item,
            username: item.username.trim(),
            text: item.text.trim(),
        }));

        // Return messages or an empty array if none found
        return sendResponse(messages.length > 0 ? messages : []);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return sendError(500, 'Error fetching messages');
    }
};