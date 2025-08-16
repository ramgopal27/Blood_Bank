import { useEffect, useState } from "react";

export default function StockManagement() {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await fetch("http://localhost:8080/admin/dashboard/stock");
        if (!res.ok) throw new Error("Failed to fetch stock");
        const data = await res.json();
        setStock(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStock();
  }, []);

  if (loading) return <p>Loading stock...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!stock.length) return <p>No stock data found.</p>;

  return (
    <div className="section-container">
      <h2>📦 Blood Stock</h2>
      <table>
        <thead>
          <tr>
            <th>Blood Group</th>
            <th>Units</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((s) => (
            <tr key={s._id}>
              <td>{s.bloodGroup}</td>
              <td>{s.units}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
