export default function Messages() {
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

  return (
    <div style={sectionStyle}>
      <h2 style={headerStyle}>Messages</h2>
      <p style={pStyle}>No messages available.</p>
      {/* Later add chat or messages list */}
    </div>
  );
}
