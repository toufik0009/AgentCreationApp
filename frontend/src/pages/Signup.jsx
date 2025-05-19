import React, { useState } from 'react';
import axios from '../api/index';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+1', // default
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMsg('');
  setSuccessMsg('');

  const { name, email, phone, password, confirmPassword, countryCode } = formData;

  if (password !== confirmPassword) {
    setErrorMsg('Passwords do not match');
    return;
  }

  try {
    const fullPhone = `${countryCode}${phone}`;
    const res = await axios.post('/api/agents', {
      name,
      email,
      phone: fullPhone,
      password,
    });


    const { token, agent } = res.data;
    
    login(token, agent); 

    setSuccessMsg('Registration successful! Redirecting to dashboard...');

    setTimeout(() => navigate('/dashboard'), 2000);
  } catch (err) {
    setErrorMsg(err.response?.data?.message || 'Registration failed');
  }
};


  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Create Account</h2>

        {errorMsg && <div style={styles.error}>{errorMsg}</div>}
        {successMsg && <div style={styles.success}>{successMsg}</div>}

        <label style={styles.label}>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
          placeholder="Full Name"
        />

        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
          placeholder="example@mail.com"
        />

        <label style={styles.label}>Phone Number</label>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            required
            style={{ ...styles.input, width: '35%' }}
          >
            <option value="+1">US +1</option>
            <option value="+44">GB +44</option>
            <option value="+91">IN +91</option>
            <option value="+61">AU +61</option>
            <option value="+254">KE +254</option>
            {/* Add more country codes as needed */}
          </select>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ ...styles.input, width: '65%' }}
            placeholder="Phone Number"
          />
        </div>

        <label style={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
          placeholder="Create a password"
        />

        <label style={styles.label}>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          style={styles.input}
          placeholder="Re-enter your password"
        />

        <button type="submit" style={styles.button}>Sign Up</button>

        <p style={styles.footerText}>
          Already have an account? <a href="/login" style={styles.link}>Login</a>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #f6f9fc, #e9f2fb)',
    padding: '1rem',
  },
  form: {
    backgroundColor: '#fff',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '450px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#222',
    fontSize: '1.8rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#444',
  },
  input: {
    width: '100%',
    padding: '0.65rem',
    marginBottom: '1.25rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '0.8rem',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  error: {
    color: '#d93025',
    marginBottom: '1rem',
    backgroundColor: '#fce8e6',
    padding: '0.75rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
  },
  success: {
    color: '#0f5132',
    backgroundColor: '#d1e7dd',
    padding: '0.75rem',
    borderRadius: '6px',
    marginBottom: '1rem',
    fontSize: '0.9rem',
  },
  footerText: {
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '0.9rem',
    color: '#555',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};
