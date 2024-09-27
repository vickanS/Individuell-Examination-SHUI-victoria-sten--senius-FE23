const { db } = require('../../services/db');
const { sendResponse, sendError } = require('../../responses');
const { v4: uuidv4 } = require('uuid');

module.exports.createMessage = async (event) => {
    try {
        const { username, text } = JSON.parse(event.body);
        const id = uuidv4();
        const createdAt = new Date().toISOString();

        const params = {
            TableName: 'MessagesTable-dev',
            Item: {
                id: id,
                username: username.trim(),
                text: text.trim(),
                createdAt: createdAt,
            }
        };

        console.log('DynamoDB put params:', params); // Loggar parametrarna

        // Lägg till .promise() för att få ett resultat
        const result = await db.put(params).promise();
        console.log('DynamoDB put result:', result); // Loggar resultatet från DynamoDB

        return sendResponse(params.Item);
    } catch (error) {
        console.error('Error creating message:', error); // Loggar felet
        return sendError(500, 'Error creating message');
    }
};