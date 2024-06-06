// src/components/Header.js

import React from 'react';
import '../index.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">COMPANY NAME</div>
      <nav className="nav">
        <a href="#home">Home</a>
        <a href="#product">Product</a>
        <a href="#services">Services</a>
        <a href="#about">About</a>
      </nav>
    </header>
  );
};

export default Header;
