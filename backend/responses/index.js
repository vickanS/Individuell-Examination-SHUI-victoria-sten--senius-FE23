function sendResponse(data) {
    return {
        statusCode: 200, // Standard success status code
        headers: {
            'Content-Type': 'application/json', // Specifies that the response body is in JSON format
        },
        body: JSON.stringify({
            data, // The response data is wrapped in a 'data' key and converted to a JSON string
        }),
    };
}

function sendError(statusCode, errorMessage) {
    return {
        statusCode: statusCode, // Allows for dynamic error status codes (e.g., 404, 500)
        headers: {
            'Content-Type': 'application/json', // Specifies that the response body is in JSON format
        },
        body: JSON.stringify({
            errorMessage, // The error message is passed in the body as a string
        }),
    };
}

module.exports = { sendResponse, sendError };