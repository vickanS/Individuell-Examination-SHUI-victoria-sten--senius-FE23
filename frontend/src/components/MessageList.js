import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MessageList = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/messages`);
                setMessages(response.data);
                console.log('Fetched messages:', response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div>
            <h2>Messages</h2>
            <ul>
                {messages.map(message => (
                    <li key={message.id}>{message.text} - {message.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default MessageList;