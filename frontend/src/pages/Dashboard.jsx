import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/index"; // assuming axios instance is set up

export default function Dashboard() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get("/api/agents");
        setAgents(res.data);
      } catch (err) {
        setError(
          "Failed to fetch agents: " +
            (err.response?.data?.message || err.message)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const handleUploadCSV = () => navigate("/upload");
  const handleUploadExcel = () => navigate("/upload");
  const handleAddAgent = () => navigate("/add-agent");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <img
          src="https://img.freepik.com/free-psd/3d-space-rocket-with-smoke_23-2148938939.jpg?semt=ais_hybrid&w=740"
          alt="Agent"
          style={styles.avatar}
        />
        <h2 style={styles.agentTitle}>Agent Profile</h2>
        <p style={styles.agentDetail}>
          <strong>Name:</strong> {user?.name}
        </p>
        <p style={styles.agentDetail}>
          <strong>Email:</strong> {user?.email}
        </p>

        <div style={styles.buttonGroup}>
          <button onClick={handleUploadCSV} style={styles.button}>
            📄 Upload CSV
          </button>
          <button onClick={handleUploadExcel} style={styles.button}>
            📊 Upload Excel
          </button>
          <button onClick={handleAddAgent} style={styles.button}>
            ➕ Add Agent
          </button>
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} style={styles.logoutButton}>
          🚪 Logout
        </button>
      </div>

      {/* Main content */}
      <div style={styles.main}>
        <h1 style={styles.heading}>Welcome to the Admin Dashboard</h1>
        <p style={styles.subHeading}>Manage your agents and upload data files.</p>

        {loading && <p>Loading agents...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && agents.length === 0 && <p>No agents found.</p>}

        {!loading && !error && agents.length > 0 && (
          <div style={styles.agentList}>
            {agents.map((agent) => (
              <div key={agent._id || agent.id} style={styles.agentCard}>
                <p><strong>Name:</strong> {agent.name || "N/A"}</p>
                <p><strong>Email:</strong> {agent.email || "N/A"}</p>
                <p><strong>Phone:</strong> {agent.phone || "N/A"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#e2e8f0",
  },
  sidebar: {
    width: "280px",
    background: "#0f172a",
    color: "white",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRight: "1px solid #334155",
    boxShadow: "4px 0 8px rgba(0, 0, 0, 0.1)",
    position: "relative", // needed for logout button positioning
  },
  avatar: {
    borderRadius: "50%",
    marginBottom: "20px",
    border: "3px solid #38bdf8",
    width: "100px",
    height: "100px",
  },
  agentTitle: {
    fontSize: "24px",
    marginBottom: "10px",
    borderBottom: "2px solid #38bdf8",
    paddingBottom: "6px",
    width: "100%",
    textAlign: "center",
  },
  agentDetail: {
    fontSize: "15px",
    margin: "5px 0",
  },
  main: {
    flex: 1,
    padding: "60px 80px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    backgroundColor: "#f8fafc",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "20px",
  },
  subHeading: {
    fontSize: "18px",
    color: "#475569",
    marginBottom: "30px",
  },
  buttonGroup: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
  },
  button: {
    padding: "14px 24px",
    fontSize: "16px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    width: "100%",
    fontWeight: "600",
    textAlign: "left",
  },
  logoutButton: {
    position: "absolute",
    bottom: "20px",
    width: "calc(100% - 40px)",
    padding: "14px 24px",
    fontSize: "16px",
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    textAlign: "center",
  },
  agentList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  agentCard: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    border: "1px solid #cbd5e1",
  },
};
