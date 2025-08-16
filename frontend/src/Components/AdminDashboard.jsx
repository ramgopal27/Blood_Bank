import { useEffect, useState } from "react";
import "../css/AdminDashboard.css";

// Admin sub-pages
import Alerts from "./Alerts.jsx";
import DonorManagement from "./DonorManagement.jsx";
import RecipientManagement from "./RecipientManagement.jsx";
import Reports from "./Reports.jsx";
import RequestManagement from "./RequestManagement.jsx";
import StockManagement from "./StockManagement.jsx";
import UsersManagement from "./UserManagement.jsx";

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/admin/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        const stock = data.stockByGroup || {};
        setSummary({
          totalUnits: Object.values(stock).reduce((a, b) => a + b, 0),
          bloodStock: stock,
          totalDonors: data.donorsCount || 0,
          totalRecipients: data.recipientsCount || 0,
          pendingRequests: data.pendingRequests || 0,
          emergencyRequests: data.emergencyRequests || 0,
          recentActivity: data.recentActivity || [],
          lowStock: data.lowStock || [],
        });
      } catch (e) {
        console.error(e);
        setError(e.message || "Failed to load dashboard");
        if (e.message?.toLowerCase().includes("token")) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      }
    };
    load();
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case "stock":
        return <StockManagement />;
      case "donors":
        return <DonorManagement />;
      case "recipients":
        return <RecipientManagement />;
      case "requests":
        return <RequestManagement />;
      case "reports":
        return <Reports />;
      case "users":
        return <UsersManagement />;
      case "alerts":
        return <Alerts />;
      default:
        return (
          <>
            {/* Dashboard Overview */}
            <div className="dashboard-overview">
              <h2>📊 Admin Dashboard Overview</h2>

              <div className="cards">
                <div className="card">
                  📦 Total Units <b>{summary.totalUnits}</b>
                </div>
                <div className="card">
                  🧑‍🤝‍🧑 Donors <b>{summary.totalDonors}</b>
                </div>
                <div className="card">
                  🧑‍⚕️ Recipients <b>{summary.totalRecipients}</b>
                </div>
                <div className="card">
                  📩 Pending Requests <b>{summary.pendingRequests}</b>
                </div>
                <div className="card emergency-card">
                  🚨 Emergency Requests <b>{summary.emergencyRequests}</b>
                </div>
              </div>

              <div className="blood-grid">
                {Object.entries(summary.bloodStock).map(([group, units]) => (
                  <div key={group} className="blood-group-card">
                    <div className="group">{group}</div>
                    <div className="units">{units} units</div>
                  </div>
                ))}
              </div>

              <div className="recent-activity">
                <h3>📝 Recent Activity</h3>
                {summary.recentActivity.length > 0 ? (
                  <ul>
                    {summary.recentActivity.map((item, idx) => (
                      <li key={idx}>
                        {item.type === "donation"
                          ? "🩸 Donation"
                          : "📩 Request"}{" "}
                        - {item.details} ({new Date(item.date).toLocaleString()}
                        )
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No recent activity.</p>
                )}
              </div>
            </div>
          </>
        );
    }
  };

  if (error) return <div className="error-text">{error}</div>;
  if (!summary) return <div className="loading-text">Loading dashboard...</div>;

  return (
    <div className="admin-dashboard-page">
      <aside className="admin-sidenav">
        <div className="logo">🩸 Blood Bank Admin</div>
        <nav>
          <button onClick={() => setActiveSection("overview")}>Overview</button>
          <button onClick={() => setActiveSection("stock")}>Stock</button>
          <button onClick={() => setActiveSection("donors")}>Donors</button>
          <button onClick={() => setActiveSection("recipients")}>
            Recipients
          </button>
          <button onClick={() => setActiveSection("requests")}>Requests</button>
          <button onClick={() => setActiveSection("reports")}>Reports</button>
          <button onClick={() => setActiveSection("users")}>Users</button>
          <button onClick={() => setActiveSection("alerts")}>Alerts</button>
        </nav>
      </aside>

      <main className="admin-main">
        {/* Logout button in top-right */}
        <div className="logout-container">
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token"); // clear token
              window.location.href = "/"; // redirect to home page
            }}
          >
            Logout
          </button>
        </div>

        {renderSection()}
      </main>
    </div>
  );
}
