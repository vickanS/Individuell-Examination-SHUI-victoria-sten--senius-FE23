import axios from 'axios';

// Bas-URL för API:et
const BASE_URL = 'https://7uc70ol753.execute-api.eu-north-1.amazonaws.com/dev';

// Middleware: apiFetch för att hantera fetch-anrop
const apiFetch = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Ett fel inträffade vid API-anropet.');
        }
        return await response.json();
    } catch (error) {
        console.error('API fetch error:', error);
        throw error; // Kasta felet vidare så att det kan hanteras av anroparen
    }
};

// Hämta alla meddelanden
export const getMessages = async (sort = null) => {
    let url = `${BASE_URL}/messages`;
    if (sort) {
        url += `?sort=${sort}`;
    }
    return apiFetch(url); // Använd middleware
};

// Skicka ett nytt meddelande
export const postMessage = async (message) => {
    return apiFetch(`${BASE_URL}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    }); // Använd middleware
};

// Redigera ett meddelande
export const editMessage = async (id, updatedMessage) => {
    const url = `${BASE_URL}/messages/${id}`;
    return apiFetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMessage),
    }); // Använd middleware
};

// Hämta meddelanden sorterade efter datum
export const getMessagesSorted = async () => {
    return getMessages('date');
};