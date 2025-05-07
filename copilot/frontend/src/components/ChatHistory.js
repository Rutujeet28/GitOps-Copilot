import React from 'react';
import './ChatHistory.css';

const ChatHistory = ({ chats, onSelectChat, isDarkMode }) => {
  return (
    <div className={`chat-history ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="chat-history-header">
        <h3>Chat History</h3>
      </div>
      <div className="chat-list">
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`chat-item ${chat.active ? 'active' : ''}`}
            onClick={() => onSelectChat(index)}
          >
            <div className="chat-item-title">
              <span className="chat-icon">💬</span>
              <span className="chat-title">{chat.title}</span>
            </div>
            <div className="chat-item-date">{chat.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory; 