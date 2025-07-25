import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // ✅
import API from '../services/api';
import '../styles/Auth.css'; // ✅ IMPORT the styling

export default function Login() {
  const [shop_email, setShopEmail] = useState('');
  const [shop_password, setShopPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { shop_email, shop_password });
      localStorage.setItem('token', res.data.token); // ✅ SAVE TOKEN
      alert('Login successful!');

      // ✅ Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="auth-container"> {/* ✅ add styling container */}
      <h2>Shop Owner Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Shop Email"
          value={shop_email}
          onChange={(e) => setShopEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={shop_password}
          onChange={(e) => setShopPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {/* ✅ Add Register Link */}
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}
