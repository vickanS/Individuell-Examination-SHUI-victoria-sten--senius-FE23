import React, { useState } from 'react';
import axios from 'axios';

const MessageItem = ({ message, messages, setMessages }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(message.username);
  const [text, setText] = useState(message.text);

  const handleEdit = async (e) => {
    e.preventDefault();
    
    const updatedMessage = { 
      username: username.trim(), 
      text: text.trim(), 
      createdAt: new Date().toISOString() 
    };

    try {
      const response = await axios.put(`https://b8i1f9szld.execute-api.eu-north-1.amazonaws.com/message/${message.id}`, updatedMessage);
      console.log('Message updated:', response.data);
      
      const updatedMessages = messages.map((msg) =>
        msg.id === message.id ? { ...msg, ...updatedMessage } : msg
      );
      setMessages(updatedMessages);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  return (
    <li>
      {isEditing ? (
        <form onSubmit={handleEdit}>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            required 
          />
          <button type="submit">Spara</button>
          <button type="button" onClick={() => setIsEditing(false)}>Avbryt</button>
        </form>
      ) : (
        <>
          <span>{message.username}: {message.text} {new Date(message.createdAt).toLocaleString()}</span>
          <button onClick={() => setIsEditing(true)}>✏️</button>
        </>
      )}
    </li>
  );
};

export default MessageItem;