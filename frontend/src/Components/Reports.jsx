import { useEffect, useState } from "react";
import { fetchWithAuth } from "../api";

export default function Reports() {
  const [summary, setSummary] = useState(null);
  useEffect(() => {
    fetchWithAuth("/admin/reports/summary")
      .then(setSummary)
      .catch(console.error);
  }, []);
  if (!summary) return <div className="loading">Loading...</div>;
  return (
    <div className="reports-container">
      <h2>Reports & Analytics</h2>
      <h3>Stock by Group</h3>
      <ul>
        {Object.entries(summary.stockByGroup).map(([g, n]) => (
          <li key={g}>
            {g}: {n}
          </li>
        ))}
      </ul>
      <p>Donors: {summary.donorsCount}</p>
      <p>Requests: {summary.requestsCount}</p>
    </div>
  );
}
