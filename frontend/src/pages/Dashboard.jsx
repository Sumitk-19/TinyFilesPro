import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/history")
      .then(res => setHistory(res.data))
      .catch(err => setError(err?.response?.data?.message || "Failed to load"));
  }, []);

  return (
    <div className="card">
      <h3>History</h3>
      {error && <div className="error">{error}</div>}
      {history.length === 0 ? (
        <p>No activity yet.</p>
      ) : (
        <div className="history-list">
          {history.map(h => (
            <div key={h._id} className="history-item">
              <div><strong>{h.operation.toUpperCase()}</strong> — {h.fileType.toUpperCase()}</div>
              <div>Original: {(h.originalSize / 1024).toFixed(1)} KB | Final: {(h.finalSize / 1024).toFixed(1)} KB</div>
              <div style={{ fontSize: 12, color: "#666" }}>{new Date(h.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
