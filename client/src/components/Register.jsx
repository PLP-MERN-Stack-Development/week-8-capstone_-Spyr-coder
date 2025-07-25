import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import '../styles/Register.css'; // Import the CSS for styling

export default function Register() {
  const [shop_name, setShopName] = useState('');
  const [shop_email, setShopEmail] = useState('');
  const [shop_password, setShopPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', { shop_name, shop_email, shop_password });
      alert('Registered! Now login.');
      navigate('/'); // Redirect to login page
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h2>Shop Owner Registration</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <input
          className="register-input"
          placeholder="Shop Name"
          value={shop_name}
          onChange={(e) => setShopName(e.target.value)}
          required
        />
        <input
          className="register-input"
          placeholder="Shop Email"
          type="email"
          value={shop_email}
          onChange={(e) => setShopEmail(e.target.value)}
          required
        />
        <input
          className="register-input"
          placeholder="Password"
          type="password"
          value={shop_password}
          onChange={(e) => setShopPassword(e.target.value)}
          required
        />
        <button className="register-button" type="submit">Register</button>
      </form>
    </div>
  );
}
