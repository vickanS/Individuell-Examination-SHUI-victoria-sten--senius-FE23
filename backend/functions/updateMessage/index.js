const { db } = require('../../services/db');
const { sendResponse, sendError } = require('../../responses');

module.exports.updateMessage = async (event) => {
    const { id } = event.pathParameters;
    console.log('Received ID from path:', id);
    const { username, text } = JSON.parse(event.body);
    console.log('Received body:', { username, text });

    try {
        const getParams = {
            TableName: 'MessagesTable-dev',
            Key: { id: id },
        };

        console.log('Get parameters:', getParams);
        console.log('Searching for ID:', id);

        const getResult = await db.get(getParams).promise();
        console.log('Full getResult:', getResult);
        console.log('Item found:', getResult.Item);

        if (!getResult.Item) {
            console.log('Message not found in DynamoDB');
            return sendError(404, 'Message not found');
        }

        const params = {
            TableName: 'MessagesTable-dev',
            Key: { id: id },
            UpdateExpression: 'set username = :u, #columntext = :t',
            ExpressionAttributeNames: {
                "#columntext": "text",
              }, 
            ExpressionAttributeValues: {
                ':u': username.trim(),
                ':t': text.trim(),
            },
            ReturnValues: 'ALL_NEW',
        };

        const updateResult = await db.update(params).promise();
        console.log('Update result:', updateResult);  // Logga uppdateringsresultatet

        // Logga specifika attribut istället för hela objektet
        console.log('Updated message:', {
            id: id,
            username: username.trim(),
            text: text.trim()
        });

        return sendResponse({
            id: id,
            username: username.trim(),
            text: text.trim()
        });
    } catch (error) {
        console.error('Update error:', error);
        return sendError(500, 'Error updating message');
    }
};

