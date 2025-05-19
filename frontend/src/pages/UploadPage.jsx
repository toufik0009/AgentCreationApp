import { useState } from "react";
import axios from "../api/index";
import Tasks from "../components/Tasks";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);

  const upload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage({ type: "error", text: "Please select a file." });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("/api/tasks/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage({
        type: "success",
        text: "File uploaded and distributed successfully!",
      });
      setFile(null);
      document.getElementById("file-upload").value = "";
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err?.response?.data?.message || "Upload failed. Please try again.",
      });
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={upload} style={styles.form}>
        <h2 style={styles.heading}>Upload CSV or Excel File</h2>

        <input
          id="file-upload"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.fileInput}
        />

        {message && (
          <div
            style={{
              ...styles.message,
              backgroundColor:
                message.type === "success" ? "#d1fae5" : "#fee2e2",
              color: message.type === "success" ? "#065f46" : "#991b1b",
            }}
          >
            {message.text}
          </div>
        )}

        <button type="submit" style={styles.button}>
          📤 Upload
        </button>
      </form>
      <div style={styles.grid}>
        <div style={styles.tasksContainer}>
          <Tasks />
        </div>
      </div>
    </div>
  );
}

export default UploadPage;

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#f1f5f9",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: "40px",
    maxWidth: "1400px",
    margin: "0 auto",
    alignItems: "start",
  },

  form: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#1e293b",
  },
  fileInput: {
    padding: "12px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    width: "100%",
    marginBottom: "20px",
    fontSize: "16px",
    cursor: "pointer",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  message: {
    padding: "10px",
    borderRadius: "6px",
    fontSize: "14px",
    marginBottom: "20px",
  },
  tasksContainer: {
    width: "100%",
  },
};
