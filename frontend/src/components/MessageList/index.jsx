import React from 'react';
import MessageItem from '../MessageItem';

const MessageList = ({ messages }) => {
  return (
    <ul>
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </ul>
  );
};

export default MessageList;