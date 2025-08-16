export default function Profile({ user }) {
  if (!user)
    return (
      <div style={{ padding: "20px", fontSize: "16px" }}>
        Loading profile...
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
  };

  const strongStyle = {
    color: "red",
  };

  return (
    <div style={sectionStyle}>
      <h2 style={headerStyle}>Profile</h2>
      <p style={pStyle}>
        <strong style={strongStyle}>Full Name:</strong> {user.fullName}
      </p>
      <p style={pStyle}>
        <strong style={strongStyle}>Email:</strong> {user.email}
      </p>
      <p style={pStyle}>
        <strong style={strongStyle}>Role:</strong> {user.role}
      </p>
      <p style={pStyle}>
        <strong style={strongStyle}>Joined:</strong>{" "}
        {new Date(user.createdAt).toLocaleDateString()}
      </p>
      <p style={pStyle}>
        <strong style={strongStyle}>Badges:</strong>{" "}
        {user.badges?.join(", ") || "None"}
      </p>
      <p style={pStyle}>
        <strong style={strongStyle}>Recommended Events:</strong>{" "}
        {user.recommendedEvents?.join(", ") || "None"}
      </p>
    </div>
  );
}
