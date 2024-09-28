import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MessageList from '../../components/MessageList/index.jsx';

const Home = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("https://7uc70ol753.execute-api.eu-north-1.amazonaws.com/dev/messages");
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
      <h2>Meddelanden</h2>
      <MessageList messages={messages} />
    </div>
  );
};

export default Home;