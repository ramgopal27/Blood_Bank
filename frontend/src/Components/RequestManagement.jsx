import { useEffect, useState } from "react";

export default function RequestManagement() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/admin/dashboard/requests"
        );
        if (!res.ok) throw new Error("Failed to fetch requests");
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!requests.length) return <p>No requests found.</p>;

  return (
    <div className="section-container">
      <h2>📩 Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Recipient Name</th>
            <th>Recipient Email</th>
            <th>Blood Group</th>
            <th>Units</th>
            <th>Status</th>
            <th>Request Date</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r._id}>
              <td>{r.recipientName || "Anonymous"}</td>
              <td>{r.recipientEmail || "N/A"}</td>
              <td>{r.bloodGroup}</td>
              <td>{r.units}</td>
              <td>{r.status}</td>
              <td>
                {r.requestDate
                  ? new Date(r.requestDate).toLocaleString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
