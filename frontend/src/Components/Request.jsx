import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import Navigate for redirection
// import "../css/BloodRequestForm.css";
import "../css/Request.css"; // Adjust the path as necessary

export default function Request() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientEmail: "",
    bloodGroup: "",
    units: "",
  });
  const [message, setMessage] = useState("");
  const [requests, setRequests] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit new blood request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Blood request submitted successfully!");
        setFormData({
          recipientName: "",
          recipientEmail: "",
          bloodGroup: "",
          units: "",
        });
        fetchRequests();

        navigate("/");
        // Refresh requests table
      } else {
        setMessage(data.message || "Failed to submit request");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again later.");
    }
  };

  // Fetch all requests for admin
  const fetchRequests = async () => {
    try {
      const res = await fetch("http://localhost:8080/requests");
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("Error fetching blood requests:", err);
    }
  };

  // Load requests on mount
  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="br-container">
      <h2>Request Blood</h2>
      <form onSubmit={handleSubmit} className="br-form">
        <input
          type="text"
          name="recipientName"
          placeholder="Full Name"
          value={formData.recipientName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="recipientEmail"
          placeholder="Email"
          value={formData.recipientEmail}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="bloodGroup"
          placeholder="Blood Group"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="units"
          placeholder="Units Needed"
          value={formData.units}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Request</button>
      </form>

      {message && <p className="br-message">{message}</p>}
    </div>
  );
}
