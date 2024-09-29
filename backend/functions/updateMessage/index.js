const { db } = require('../../services/db');
const { sendResponse, sendError } = require('../../responses');

module.exports.updateMessage = async (event) => {
    const { id } = event.pathParameters;
    console.log('Received ID from path:', id);
    const { username, text, createdAt } = JSON.parse(event.body); 
    console.log('Received body:', { username, text, createdAt });

    try {
        const getParams = {
            TableName: 'MessagesTable-dev',
            Key: { id: id },
        };

        console.log('Get parameters:', getParams);
        const getResult = await db.get(getParams).promise();
        if (!getResult.Item) {
            console.log('Message not found in DynamoDB');
            return sendError(404, 'Message not found');
        }

        
        const params = {
            TableName: 'MessagesTable-dev',
            Key: { id: id },
            UpdateExpression: 'set username = :u, #columntext = :t, createdAt = :c',
            ExpressionAttributeNames: {
                "#columntext": "text",
            },
            ExpressionAttributeValues: {
                ':u': username.trim(),
                ':t': text.trim(),
                ':c': createdAt 
            },
            ReturnValues: 'ALL_NEW',
        };

        const updateResult = await db.update(params).promise();
        console.log('Update result:', updateResult);

        return sendResponse(updateResult.Attributes); 
    } catch (error) {
        console.error('Update error:', error);
        return sendError(500, 'Error updating message');
    }
};
