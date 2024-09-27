import axios from 'axios';

const API_URL = 'https://7uc70ol753.execute-api.eu-north-1.amazonaws.com/dev'; 

export const getMessages = () => axios.get(`${API_URL}/messages`);

export const postMessage = (newMessage) => axios.post(`${API_URL}/messages`, newMessage);

export const updateMessage = (id, updatedMessage) => axios.put(`${API_URL}/messages/${id}`, updatedMessage);