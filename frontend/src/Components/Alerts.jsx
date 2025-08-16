import { useEffect, useState } from "react";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch("http://localhost:8080/admin/dashboard/alerts");
        if (!res.ok) throw new Error("Failed to fetch alerts");
        const data = await res.json();
        setAlerts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  if (loading) return <p>Loading alerts...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!alerts.length) return <p>No alerts found.</p>;

  return (
    <div className="section-container">
      <h2>⚠️ Recent Alerts</h2>
      <ul>
        {alerts.map((a) => (
          <li key={a._id}>
            [{a.severity.toUpperCase()}] {a.message} -{" "}
            {new Date(a.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
