import React, { useState } from 'react';
import API from '../services/api';

export default function AddCustomer({ onCustomerAdded }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/customers/register', { name, phone }); // ✅
      alert('Customer added!');
      setName('');
      setPhone('');
      onCustomerAdded();
    } catch (err) {
      console.error(err);
      alert('Failed to add customer');
    }
  };

  return (
    <form className="add-customer-form" onSubmit={handleSubmit}>
      <h3>Add a New Customer</h3>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button type="submit">Add Customer</button>
    </form>
  );
}
