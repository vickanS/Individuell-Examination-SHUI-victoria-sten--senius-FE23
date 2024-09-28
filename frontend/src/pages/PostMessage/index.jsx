import React, { useState } from 'react';
import axios from 'axios';

const PostMessage = ({setMessages}) => {
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');

  const postMessage = async (message) => {
    try {
      const response = await axios.post('https://b8i1f9szld.execute-api.eu-north-1.amazonaws.com/message', message);
      console.log('Message posted:', response.data);
      
      const updatedMessages = await axios.get('https://b8i1f9szld.execute-api.eu-north-1.amazonaws.com/messages');
      setMessages(updatedMessages.data.data);
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = { 
      username: username.trim(), 
      text: text.trim(), 
      createdAt: new Date().toISOString() 
    };
    await postMessage(message); 
    setUsername(''); 
    setText(''); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Användarnamn" 
        required 
      />
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Skriv ditt meddelande" 
        required 
      />
      <button type="submit">Skicka</button>
    </form>
  );
};

export default PostMessage;