import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">NESSIFY INC</div>
        <nav className="nav">
          <Link to="/home">Home</Link>
          <a href="#features">Features</a>
          <a href="#demo">Demo</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero-section">
        <div className="hero-text">
          <h1>Welcome to Our Face Recognition Technology</h1>
          <p>Experience the future of secure and seamless identification.</p>
          <Link to="/signup">
            <button className="cta-button">Get Started</button>
          </Link>
        </div>
        <div className="hero-image">
          <img src="/facial-recog.jpg" alt="Face Recognition" />
        </div>
      </section>

      <section className="features-section" id="features">
        <h2>Our Features</h2>
        <div className="features">
          <div className="feature">
            <h3>High Accuracy</h3>
            <p>Our advanced algorithms ensure high accuracy in facial recognition, minimizing false positives and negatives. This feature is crucial for maintaining the security and integrity of access control.</p>
          </div>
          <div className="feature">
            <h3>Fast Processing</h3>
            <p>Experience near-instantaneous results with our optimized processing techniques. Our system is designed to handle large volumes of data quickly, ensuring a smooth user experience even during peak times.</p>
          </div>
          <div className="feature">
            <h3>Secure</h3>
            <p>Security is our top priority. We employ robust encryption methods to protect all data, ensuring that your personal information is safe from unauthorized access and breaches.</p>
          </div>
          <div className="feature">
            <h3>Easy Integration</h3>
            <p>Our technology can be easily integrated with existing systems, making it a versatile choice for various applications, from office access control to online exam proctoring.</p>
          </div>
          <div className="feature">
            <h3>User-Friendly Interface</h3>
            <p>Designed with the user in mind, our interface is intuitive and easy to navigate, ensuring that even those with limited technical knowledge can use it effectively.</p>
          </div>
          <div className="feature">
            <h3>Scalability</h3>
            <p>Whether you're a small business or a large enterprise, our solution can scale to meet your needs, handling increasing amounts of data and users without compromising performance.</p>
          </div>
        </div>
      </section>

      <section className="demo-section" id="demo">
        <h2>Watch Our Demo</h2>
        <div className="demo-prompt">
          <p>See our facial recognition technology in action!</p>
          <button className="cta-button">Watch Demo</button>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="footer-content">
          <p>&copy; 2024 Company Name. All rights reserved.</p>
          <nav className="footer-nav">
            <Link to="/">Home</Link>
            <a href="#features">Features</a>
            <a href="#demo">Demo</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
