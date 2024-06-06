// src/HomePage.js

import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
// import faceRecognitionImage from '../face-recog.jpg'; // Update the path according to your project structure

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header">
        <div className="logo">NESSIFY INC</div>
        <nav className="nav">
          {/* <a href="#home">Home</a> */}
          {/* <Link to="/">Home</Link> */}
          <Link to="/home">Home</Link>
          <a href="#features">Features</a>
          <a href="#demo">Demo</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <main className="main-content">
        <div className="text-section">
          <h1>FACE RECOGNITION</h1>
          <p>Welcome to our facial verification software. Experience the feature of secure and seamless identification</p>
          <Link to="/"><button className="learn-more-btn">Learn more</button></Link>
        </div>
        <div className="image-section">
          <img src="/facial-recog.jpg" alt="Face Recognition" />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
