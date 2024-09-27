const { db } = require('../../services/db');
const { sendResponse, sendError } = require('../../responses');

module.exports.getMessages = async () => {
    try {
        const params = {
            TableName: 'MessagesTable-dev',
            ConsistentRead: true,
        };

        const result = await db.scan(params).promise(); // Lägg till .promise() för att hantera asynkrona operationer
        const messages = result.Items.map(item => ({
            ...item,
            username: item.username.trim(),
            text: item.text.trim(),
        }));

        return sendResponse(messages.length > 0 ? messages : []);
    } catch (error) {
        console.error('Error fetching messages:', error); // Logga felet
        return sendError(500, 'Error fetching messages');
    }
};