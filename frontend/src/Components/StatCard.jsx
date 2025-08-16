// src/components/StatCard.jsx
// import "../css/statcard.css"; // Assuming you have a CSS file for styling
export default function StatCard({ title, value, note }) {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      <div className="card-value">{value}</div>
      {note && <div className="card-note">{note}</div>}
    </div>
  );
}
