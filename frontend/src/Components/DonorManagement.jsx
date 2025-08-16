import { useEffect, useState } from "react";

export default function DonorManagement() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await fetch("http://localhost:8080/admin/dashboard/donors");
        const data = await res.json();
        setDonors(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDonors();
  }, []);

  if (loading) return <p>Loading donors...</p>;
  if (!donors.length) return <p>No donors found.</p>;

  return (
    <div className="section-container">
      <h2>🩸 Donors</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Blood Group</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((d) => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>{d.age}</td>
              <td>{d.gender}</td>
              <td>{d.bloodGroup}</td>
              <td>{d.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
