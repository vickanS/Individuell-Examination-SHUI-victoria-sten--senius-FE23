import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MessageList from '../../components/MessageList/index.jsx';
import PostMessage from '../../pages/PostMessage/index.jsx';

const Home = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("https://b8i1f9szld.execute-api.eu-north-1.amazonaws.com/messages");
        console.log('API Response:', response.data);
        setMessages(response.data.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h1>Anslagstavla!</h1>
      <h2>Meddelanden</h2>
      <MessageList messages={messages} setMessages={setMessages} />
      <PostMessage setMessages={setMessages} messages={messages}/>
    </div>
  );
};

export default Home;