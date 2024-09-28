import React from 'react';
import MessageItem from '../MessageItem';

const MessageList = ({ messages, setMessages }) => {
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