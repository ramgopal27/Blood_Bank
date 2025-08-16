import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import Navigate for redirection
import "../css/Donate.css";
export default function BloodDonationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    contact: "",
    lastDonation: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8080/donors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get("content-type");

      // Check if response is JSON
      let data = {};
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      }

      if (res.ok) {
        setMessage("Donor added successfully!");
        setFormData({
          name: "",
          age: "",
          gender: "",
          bloodGroup: "",
          contact: "",
          lastDonation: "",
        });

        navigate("/");
      } else {
        setMessage(data.message || "Failed to add donor");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Make sure backend is running.");
    }
  };

  return (
    <div className="bd-form-container">
      <h2>Donate Blood / Register as Donor</h2>
      <form onSubmit={handleSubmit} className="bd-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="bloodGroup"
          placeholder="Blood Group"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="lastDonation"
          placeholder="Last Donation Date"
          value={formData.lastDonation}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p className="bd-message">{message}</p>}
    </div>
  );
}
