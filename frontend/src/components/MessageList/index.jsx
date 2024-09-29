import React from 'react';
import MessageItem from '../MessageItem';

const MessageList = ({ messages, setMessages }) => {
  const sortedMessages = messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return (
    <ul>
      {messages.map((message) => (
        <MessageItem
        key={message.id}
        message={message}
        messages={messages}
        setMessages={setMessages}
         />
      ))}
    </ul>
  );
};

export default MessageList;