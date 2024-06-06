import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', photo);

    console.log('Form Data:', {
      username,
      email,
      password,
      photo,
    });

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
      const { username } = await response.json();
      navigate(`/verify/${username}`);
    } catch (err) {
      console.error('Sign up error:', err.message);
    }
  };

  return (
    <div className="sign-up-page">
      <header className="header">
        <div className="logo">NESSIFY INC</div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </nav>
      </header>

      <main className="main-content">
        <h1>Sign Up</h1>
        <form className="sign-up-form" onSubmit={handleSignUp}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Upload Photo:
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              required
            />
          </label>
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login">Log In</Link></p>
      </main>
    </div>
  );
};

export default SignUpPage;