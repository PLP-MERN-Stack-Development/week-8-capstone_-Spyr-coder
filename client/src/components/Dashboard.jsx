import React, { useEffect, useState } from 'react';
import AddCustomer from './AddCustomer';
import API from '../services/api';
import '../styles/Dashboard.css'; // ✅ IMPORT your dashboard styles

// Helper function to get ordinal suffix
function ordinalSuffix(i) {
  const j = i % 10,
        k = i % 100;
  if (j === 1 && k !== 11) return i + "st";
  if (j === 2 && k !== 12) return i + "nd";
  if (j === 3 && k !== 13) return i + "rd";
  return i + "th";
}

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const res = await API.get('/customers'); // ✅ protected, so add auth header in your API!
      setCustomers(res.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="dashboard"> {/* changed from dashboard-container to dashboard */}
      <h1>Dashboard</h1>
      <p className="dashboard-welcome">Welcome to your dashboard! 🎉</p> {/* ✅ Added welcome text */}
      <AddCustomer onCustomerAdded={fetchCustomers} />
      <ul className="customer-list"> {/* added class */}
        {customers.map((c) => (
          <li key={c._id} className="customer-item"> {/* added class */}
            {c.name} - {c.phone} ({ordinalSuffix(c.total_visits)} visit)
          </li>
        ))}
      </ul>
    </div>
  );
}
