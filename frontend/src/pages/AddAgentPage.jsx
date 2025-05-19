import { useState } from 'react';
import axios from '../api/index';

function AddAgentPage() {
  const [agent, setAgent] = useState({
    name: '',
    email: '',
    countryCode: '+1',
    phone: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullPhone = `${agent.countryCode}${agent.phone}`;
    try {
      await axios.post('/api/agents', {
        ...agent,
        phone: fullPhone,
      });
      alert('Agent created');
      setAgent({ name: '', email: '', countryCode: '+1', phone: '', password: '' });
    } catch (err) {
      alert('Error: ' + (err?.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Add New Agent</h2>

        <input
          style={styles.input}
          placeholder="Name"
          value={agent.name}
          onChange={(e) => setAgent({ ...agent, name: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Email"
          value={agent.email}
          onChange={(e) => setAgent({ ...agent, email: e.target.value })}
        />

        <div style={styles.phoneRow}>
          <select
            style={styles.countryCode}
            value={agent.countryCode}
            onChange={(e) => setAgent({ ...agent, countryCode: e.target.value })}
          >
            <option value="+1">US +1</option>
            <option value="+44">GB +44</option>
            <option value="+91">IN +91</option>
            <option value="+254">KE +254</option>
            <option value="+61">AU +61</option>
          </select>
          <input
            style={styles.phoneInput}
            placeholder="Phone Number"
            value={agent.phone}
            onChange={(e) => setAgent({ ...agent, phone: e.target.value })}
          />
        </div>

        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          value={agent.password}
          onChange={(e) => setAgent({ ...agent, password: e.target.value })}
        />

        <button type="submit" style={styles.button}>
          ➕ Add Agent
        </button>
      </form>
    </div>
  );
}

export default AddAgentPage;

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f1f5f9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  heading: {
    fontSize: '24px',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: '10px',
  },
  input: {
    padding: '12px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
  },
  phoneRow: {
    display: 'flex',
    gap: '10px',
  },
  countryCode: {
    flex: '0 0 90px',
    padding: '10px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '16px',
  },
  phoneInput: {
    flex: 1,
    padding: '12px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '16px',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};
