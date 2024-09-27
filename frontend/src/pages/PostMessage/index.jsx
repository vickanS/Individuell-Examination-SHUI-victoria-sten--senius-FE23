import React, { useState } from 'react';
import axios from 'axios';
import { postMessage } from '../../services/api';

const PostMessage = () => {
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postMessage({ username, text });
    setUsername('');
    setText('');
    // Här kan du också lägga till logik för att uppdatera meddelandelistan om du vill
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