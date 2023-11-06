import { useState, useEffect } from 'react';

export function RoundedBackground({ children }) {
    const [backgroundHeight, setBackgroundHeight] = useState('100vh');
  
    useEffect(() => {
      function resizeBackground() {
        const content = document.querySelector('.content-signupusers');
        const contentHeight = content.offsetHeight;
        const windowHeight = window.innerHeight;
        const newBackgroundHeight = Math.max(contentHeight, windowHeight * 0.6);
        setBackgroundHeight(`${newBackgroundHeight}px`);
      }
  
      resizeBackground();
      window.addEventListener('resize', resizeBackground);
  
      return () => {
        window.removeEventListener('resize', resizeBackground);
      };
    }, []);
  
    return (
      <div className="rounded-background-signupusers" style={{ height: `${backgroundHeight}px` }}>
        <div className="content-signupusers">
        { children }
        </div>
      </div>
    );
  }