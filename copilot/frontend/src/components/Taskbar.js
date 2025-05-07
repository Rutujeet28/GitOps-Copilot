import React, { useState, useRef } from 'react';
import './Taskbar.css';

const Taskbar = ({ user, onSignOut, isDarkMode, onToggleTheme }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipAlign, setTooltipAlign] = useState('center');
  const btnRef = useRef(null);
  const tooltipRef = useRef(null);
  const tooltipMsg = 'Sign in to access chat history and save your conversations.';

  const handleTooltip = (show) => {
    setShowTooltip(show);
    if (show && btnRef.current && tooltipRef.current) {
      const btnRect = btnRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const padding = 8;
      if (btnRect.left + btnRect.width / 2 - tooltipRect.width / 2 < padding) {
        setTooltipAlign('left');
      } else if (btnRect.left + btnRect.width / 2 + tooltipRect.width / 2 > window.innerWidth - padding) {
        setTooltipAlign('right');
      } else {
        setTooltipAlign('center');
      }
    }
  };

  return (
    <div className={`taskbar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="taskbar-left">
        <img src="/logo.png" alt="Project Logo" className="project-logo" />
        <h1>GitOps Copilot</h1>
      </div>
      <div className="theme-toggle">
        <button onClick={onToggleTheme} className="theme-btn">
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
      </div>
      <div className="taskbar-right">
        {user ? (
          <div className="user-section">
            <img src={user.avatar || '/default-avatar.png'} alt="User Avatar" className="user-avatar" />
            <span className="username">{user.name}</span>
            {user.isGuest ? (
              <div className="guest-signin-btn-tooltip-wrapper">
                <button
                  ref={btnRef}
                  onClick={onSignOut}
                  className="sign-out-btn guest-signin-btn"
                  onMouseEnter={() => handleTooltip(true)}
                  onMouseLeave={() => handleTooltip(false)}
                >
                  Sign In
                </button>
                {showTooltip && (
                  <div
                    ref={tooltipRef}
                    className={`custom-tooltip tooltip-${tooltipAlign}`}
                  >
                    {tooltipMsg}
                  </div>
                )}
              </div>
            ) : (
              <button onClick={onSignOut} className="sign-out-btn">Sign Out</button>
            )}
          </div>
        ) : (
          <button className="sign-in-btn">Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Taskbar; 