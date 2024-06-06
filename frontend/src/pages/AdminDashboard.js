import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/users');
      const users = await response.json();
      setUsers(users);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAllow = async (userId) => {
    // Update user status to allowed
    await fetch(`/api/users/${userId}/allow`, { method: 'POST' });
    setUsers(users.map(user => user.id === userId ? { ...user, status: 'allowed' } : user));
  };

  const handleDeny = async (userId) => {
    // Update user status to denied
    await fetch(`/api/users/${userId}/deny`, { method: 'POST' });
    setUsers(users.map(user => user.id === userId ? { ...user, status: 'denied' } : user));
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>COMPANY NAME</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/admin">Admin Dashboard</Link></li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button className="upgrade-btn">Upgrade Now</button>
        </div>
      </aside>
      <main className="main-content">
        <header className="header">
          <h1>Admin Dashboard</h1>
          <div className="header-actions">
            <input type="search" placeholder="Search..." />
            <div className="user-info">
              <span>Hi, Admin</span>
            </div>
          </div>
        </header>
        <section className="dashboard-metrics">
          <div className="metric-card">
            <h3>Total Users</h3>
            <p>{users.length}</p>
          </div>
          <div className="metric-card">
            <h3>Verified Users</h3>
            <p>{users.filter(user => user.status === 'allowed').length}</p>
          </div>
          <div className="metric-card">
            <h3>Pending Verifications</h3>
            <p>{users.filter(user => user.status === 'pending').length}</p>
          </div>
        </section>
        <section className="user-table">
          <h2>User Management</h2>
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Photo</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td><img src={user.photo} alt={user.username} /></td>
                    <td>{user.status}</td>
                    <td>
                      <button onClick={() => handleAllow(user.id)}>Allow</button>
                      <button onClick={() => handleDeny(user.id)}>Deny</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
