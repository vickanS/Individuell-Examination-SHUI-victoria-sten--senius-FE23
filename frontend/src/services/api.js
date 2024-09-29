import axios from 'axios'; 

const BASE_URL = 'https://7uc70ol753.execute-api.eu-north-1.amazonaws.com/dev'; // Base URL for the API

// Function to handle API requests
const apiFetch = async (url, options = {}) => {
    try {
        const response = await fetch(url, options); // Make the API call
        // Check if the response is not okay (status code outside of 200-299 range)
        if (!response.ok) {
            const errorResponse = await response.json(); // Parse the error response
            throw new Error(errorResponse.message || 'Ett fel inträffade vid API-anropet.'); // error message
        }
        return await response.json(); // Return the parsed JSON response if successful
    } catch (error) {
        console.error('API fetch error:', error); // Log the error to the console
        throw error; // Re-throw the error for further handling
    }
};

// Function to get messages, with optional sorting
export const getMessages = async (sort = null) => {
    let url = `${BASE_URL}/messages`; // Set the URL to fetch messages
    if (sort) {
        url += `?sort=${sort}`; // Append sort parameter to the URL if provided
    }
    return apiFetch(url); // Call apiFetch with the constructed URL
};

// Function to post a new message
export const postMessage = async (message) => {
    return apiFetch(`${BASE_URL}/messages`, {
        method: 'POST', // Specify POST method
        headers: {
            'Content-Type': 'application/json', // Set content type to JSON
        },
        body: JSON.stringify(message), // Convert the message object to a JSON string
    }); 
};

// Function to edit an existing message by ID
export const editMessage = async (id, updatedMessage) => {
    const url = `${BASE_URL}/messages/${id}`; // Construct the URL for the specific message
    return apiFetch(url, {
        method: 'PUT', // Specify PUT method for updating
        headers: {
            'Content-Type': 'application/json', // Set content type to JSON
        },
        body: JSON.stringify(updatedMessage), // Convert the updated message object to a JSON string
    }); 
};

// Function to get messages sorted by date
export const getMessagesSorted = async () => {
    return getMessages('date'); // Call getMessages with 'date' sorting
};
