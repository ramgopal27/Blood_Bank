import { useEffect, useState } from "react";

export default function RecipientManagement() {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/admin/dashboard/recipients"
        );
        if (!res.ok) throw new Error("Failed to fetch recipients");
        const data = await res.json();
        setRecipients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipients();
  }, []);

  if (loading) return <p>Loading recipients...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!recipients.length) return <p>No recipients found.</p>;

  return (
    <div className="section-container">
      <h2>🧑‍⚕️ Recipients</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Blood Group</th>
            <th>Contact</th>
            <th>Request Date</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.age}</td>
              <td>{r.gender}</td>
              <td>{r.bloodGroup}</td>
              <td>{r.contact}</td>
              <td>
                {r.requestDate
                  ? new Date(r.requestDate).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
