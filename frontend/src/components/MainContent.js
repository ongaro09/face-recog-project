// src/components/MainContent.js

import React from 'react';
import '../index.css';


const MainContent = () => {
  return (
    <main className="main-content">
      <div className="text-section">
        <h1>FACE RECOGNITION</h1>
        <p>Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
        <button className="learn-more-btn">Learn more</button>
      </div>
      <div className="image-section">
        <img src="C:\Users\mukam\Desktop\portfolio-project\facial-recognition-app\public\facial-recog.jpg" alt="Face Recognition" />
      </div>
    </main>
  );
};

export default MainContent;
