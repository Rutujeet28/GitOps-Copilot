import React, { useState } from 'react';
import Taskbar from './components/Taskbar';
import Login from './components/Login';
import ChatHistory from './components/ChatHistory';
import TitleInput from './components/TitleInput';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [promptText, setPromptText] = useState('');
  const [showTitleInput, setShowTitleInput] = useState(false);

  const handleLogin = (credentials) => {
    if (credentials.skip) {
      setUser({
        name: 'Guest User',
        email: 'guest@example.com',
        avatar: null,
        isGuest: true
      });
      return;
    }

    setUser({
      name: credentials.name || 'John Doe',
      email: credentials.email,
      avatar: null,
      isGuest: false
    });
  };

  const handleSignOut = () => {
    setUser(null);
    setChats([]);
    setCurrentChat(null);
    setShowTitleInput(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark');
  };

  const handleTitleSubmit = (title) => {
    setShowTitleInput(false);
    const newChat = {
      title: title,
      date: new Date().toLocaleDateString(),
      content: '',
      active: true
    };

    setChats(prevChats => {
      const updatedChats = prevChats.map(chat => ({
        ...chat,
        active: false
      }));
      return [newChat, ...updatedChats];
    });

    setCurrentChat(newChat);
  };

  const handleAsk = () => {
    if (!promptText.trim()) return;

    if (user.isGuest) {
      // For guest users, just clear the prompt
      setPromptText('');
      return;
    }

    setChats(prevChats => 
      prevChats.map((chat, index) => 
        index === 0 
          ? { ...chat, content: promptText }
          : chat
      )
    );

    setPromptText('');
  };

  const handleSelectChat = (index) => {
    setChats(prevChats => 
      prevChats.map((chat, i) => ({
        ...chat,
        active: i === index
      }))
    );
    setCurrentChat(chats[index]);
    setPromptText(chats[index].content);
  };

  const startNewChat = () => {
    if (user.isGuest) {
      // For guest users, just clear the prompt
      setPromptText('');
      return;
    }
    setShowTitleInput(true);
    setPromptText('');
  };

  const renderMainContent = () => {
    if (!user) {
      return <Login onLogin={handleLogin} />;
    }

    if (user.isGuest) {
      return (
        <div className="dashboard guest-dashboard">
          <div className="guest-prompt-section">
            <textarea
              placeholder="Enter your prompt here..."
              className="prompt-input"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
            />
            <button 
              className="ask-button" 
              onClick={handleAsk}
            >
              Ask
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="dashboard">
        <div className="chat-container">
          <div className="chat-main">
            <h2>Welcome, {user.name}!</h2>
            {showTitleInput ? (
              <TitleInput 
                onSubmit={handleTitleSubmit}
                isDarkMode={isDarkMode}
              />
            ) : (
              <>
                <button 
                  className="new-chat-btn"
                  onClick={startNewChat}
                >
                  Start New Chat
                </button>
                <div className="prompt-section">
                  <textarea
                    placeholder="Enter your prompt here..."
                    className="prompt-input"
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                  />
                  <button 
                    className="ask-button" 
                    onClick={handleAsk}
                    disabled={!currentChat}
                  >
                    Ask
                  </button>
                </div>
              </>
            )}
          </div>
          <ChatHistory 
            chats={chats}
            onSelectChat={handleSelectChat}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <Taskbar 
        user={user} 
        onSignOut={handleSignOut} 
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />
      <main className="main-content">
        {renderMainContent()}
      </main>
    </div>
  );
}

export default App;
