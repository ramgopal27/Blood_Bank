// src/components/StockChips.jsx
import "../css/stockchips.css"; // Assuming you have a CSS file for styling
const colorFor = (units, threshold) => {
  if (units <= 0) return "chip danger";
  if (units <= threshold) return "chip warn";
  return "chip ok";
};

export default function StockChips({ stockByGroup = {}, threshold = 10 }) {
  return (
    <div className="chips">
      {Object.entries(stockByGroup).map(([g, n]) => (
        <span key={g} className={colorFor(n, threshold)}>
          {g}: {n}
        </span>
      ))}
    </div>
  );
}
