import React from 'react';

const MessageItem = ({ message }) => {
  return (
    <li>
      <strong>{message.username}</strong>: {message.text} <em>{new Date(message.createdAt).toLocaleString()}</em>
    </li>
  );
};

export default MessageItem;