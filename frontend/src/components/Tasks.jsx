import React, { useEffect, useState } from "react";
import axios from "../api/index";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("/api/tasks");
        setTasks(res.data);
      } catch (err) {
        alert(
          "Failed to fetch tasks: " +
            (err.response?.data?.message || err.message)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Tasks <span style={{color:"green"}}>({tasks.length})</span> </h2>
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div style={styles.grid}>
          {tasks.map((task, index) => (
            <div key={index} style={styles.taskCard}>
              <strong style={styles.title}>
                {task.title || `Task #${index + 1}`}
              </strong>
              <p>
                <strong>First Name:</strong> {task.firstName || "Unknown"}
              </p>
              <p>
                <strong>Notes:</strong> {task.notes || "None"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "30px",
    color: "#1e293b",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "40px",
    maxWidth: "1400px",
    margin: "0 auto",
    alignItems: "start",
  },

  taskCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    transition: "transform 0.2s ease",
    cursor: "pointer",
  },
  title: {
    fontSize: "20px",
    marginBottom: "14px",
    color: "#0f172a",
  },
};
