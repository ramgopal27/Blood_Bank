import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/lr.css";

export default function LR() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const arrowSrc = isOpen ? "up-arrow.png" : "down-arrows.png";

  return (
    <div className="lr-container" onClick={toggleDropdown}>
      <img className="lr-icon" src="add-user.png" alt="User" />
      <img className="lr-icon" src={arrowSrc} alt="Toggle dropdown" />
      {isOpen && (
        <div className="lr-dropdown">
          <Link className="lr-link" to="/login">
            Login
          </Link>
          <Link className="lr-link" to="/signup">
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
