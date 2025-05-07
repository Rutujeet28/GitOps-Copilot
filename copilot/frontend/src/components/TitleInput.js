import React, { useState } from 'react';
import './TitleInput.css';

const TitleInput = ({ onSubmit, isDarkMode }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title);
      setTitle('');
    }
  };

  return (
    <div className={`title-input-container ${isDarkMode ? 'dark' : 'light'}`}>
      <form onSubmit={handleSubmit}>
        <div className="title-input-group">
          <label htmlFor="chat-title">Enter Chat Title</label>
          <input
            type="text"
            id="chat-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your chat..."
            required
          />
        </div>
        <button type="submit" className="start-chat-btn">Start Chat</button>
      </form>
    </div>
  );
};

export default TitleInput; 