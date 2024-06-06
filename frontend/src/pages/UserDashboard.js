import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';
import './UserDashboardPage.css'; 

const DashboardPage = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState({ username: '', email: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/dashboard/${username}`);
        const data = await response.json();
        if (response.ok) {
          setUserData(data);
        } else {
          alert(`Error fetching user data: ${data.message}`);
        }
      } catch (err) {
        console.error('Error fetching user data:', err.message);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome, {userData.username}</h1>
      </div>
      <div className="user-info">
        <div className="user-card">
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;