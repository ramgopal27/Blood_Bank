import { Route, Routes } from "react-router-dom";
import "./App.css";
// ✅ User side components
import Home from "./Components/Home.jsx";
import Login from "./Components/Login.jsx";
import Signup from "./Components/Signup.jsx";
import UserDashboard from "./Components/UserDashboard.jsx";

// ✅ Admin side components
import AdminDashboard from "./Components/AdminDashboard.jsx";
import Donate from "./Components/Donate.jsx";
import Recieve from "./Components/Request.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public/User Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/request" element={<Recieve />} />
      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}
