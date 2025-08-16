export default function AccountSettings({ user }) {
  if (!user)
    return (
      <div style={{ padding: "20px", fontSize: "16px" }}>
        Loading account settings...
      </div>
    );

  const sectionStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  };

  const headerStyle = {
    marginTop: 0,
    marginBottom: "15px",
    fontSize: "20px",
    color: "red",
    borderBottom: "2px solid #f87171",
    paddingBottom: "5px",
  };

  const pStyle = {
    marginBottom: "10px",
    fontSize: "14px",
    lineHeight: 1.6,
    color: "red",
  };

  const strongStyle = {
    color: "red",
  };

  return (
    <div style={sectionStyle}>
      <h2 style={headerStyle}>Account Settings</h2>
      <p style={pStyle}>Here you can update your account settings.</p>
      <p style={pStyle}>
        <strong style={strongStyle}>Email:</strong> {user.email}
      </p>
      {/* Add more settings form fields here */}
    </div>
  );
}
