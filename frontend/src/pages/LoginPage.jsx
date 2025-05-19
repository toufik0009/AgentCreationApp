import { useState, useContext, useEffect } from "react";
import axios from "../api/index";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { token, agent } = res.data;
      console.log("Data", agent);
      login(token, agent);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Welcome Back</h2>
        <p style={styles.subtext}>Please login to your account</p>

        {errorMsg && <div style={styles.error}>{errorMsg}</div>}

        <label style={styles.label}>Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
          placeholder="example@mail.com"
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
          placeholder="Enter your password"
        />

        <button type="submit" style={styles.button}>
          Login
        </button>

        <p style={styles.footerText}>
          Don’t have an account?{" "}
          <a href="/register" style={styles.link}>
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #e0eafc, #cfdef3)",
    padding: "1rem",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "2.5rem",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "0.5rem",
    color: "#222",
    fontSize: "1.8rem",
  },
  subtext: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#666",
    fontSize: "0.95rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "bold",
    color: "#444",
  },
  input: {
    width: "100%",
    padding: "0.65rem",
    marginBottom: "1.25rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    transition: "border-color 0.3s",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "0.8rem",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  error: {
    color: "#d93025",
    marginBottom: "1rem",
    backgroundColor: "#fce8e6",
    padding: "0.75rem",
    borderRadius: "6px",
    fontSize: "0.9rem",
  },
  footerText: {
    textAlign: "center",
    marginTop: "1.5rem",
    fontSize: "0.9rem",
    color: "#555",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
