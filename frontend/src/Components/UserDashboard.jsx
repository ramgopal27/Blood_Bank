import { useEffect, useState } from "react";
import logo from "../assets/logo.jpg"; // Adjust the path as necessary
import "../css/UserDashboard.css";
import Alerts from "./Alerts";
import StatCard from "./StatCard";

// Import your components for sections
import AccountSettings from "./AccountSettings";
import Messages from "./Messages";
import Notifications from "./Notifications";
import Profile from "./Profile";

export default function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("profile"); // default section

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found. Please login.");
      setLoading(false);
      return;
    }

    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/user/dashboard/summary",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.status === 401) {
          setError("Unauthorized. Please login again.");
          setLoading(false);
          return;
        }

        if (!res.ok) {
          setError("Failed to load dashboard. Try again later.");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setUserData(data.user);
        setStats(data.stats);
        setAlerts(data.alerts);
        setRecentActivity(data.recentActivity);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (loading) return <div className="ud-loading">Loading dashboard...</div>;
  if (error) return <div className="ud-error">{error}</div>;

  return (
    <div className="ud-container">
      {/* Sidebar */}
      <aside className="ud-sidebar">
        <div className="ud-user-info">
          <img src={logo} alt="Profile" />
          <h2>{userData.fullName}</h2>
          <p>{userData.email}</p>
        </div>
        <nav className="ud-nav">
          <button
            className={activeSection === "profile" ? "active" : ""}
            onClick={() => setActiveSection("profile")}
          >
            Profile
          </button>
          <button
            className={activeSection === "account" ? "active" : ""}
            onClick={() => setActiveSection("account")}
          >
            Account Settings
          </button>
          <button
            className={activeSection === "notifications" ? "active" : ""}
            onClick={() => setActiveSection("notifications")}
          >
            Notifications
          </button>
          <button
            className={activeSection === "messages" ? "active" : ""}
            onClick={() => setActiveSection("messages")}
          >
            Messages
          </button>
          <button className="ud-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ud-main">
        {activeSection === "profile" && <Profile user={userData} />}
        {activeSection === "account" && <AccountSettings user={userData} />}
        {activeSection === "notifications" && <Notifications />}
        {activeSection === "messages" && <Messages />}

        {/* Optionally keep Stats and Alerts visible on all sections */}
        <div className="ud-stats">
          {stats.map((stat, idx) => (
            <StatCard
              key={idx}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        <section className="ud-section">
          <h3>Alerts</h3>
          {alerts.map((alert, idx) => (
            <Alerts key={idx} type={alert.severity} message={alert.message} />
          ))}
        </section>
      </main>
    </div>
  );
}
