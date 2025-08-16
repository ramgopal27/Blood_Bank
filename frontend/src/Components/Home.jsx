import { Link } from "react-router-dom";
import "../css/Home.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">🩸 Blood Bank</div>
        <div className="nav-buttons">
          <Link to="/login" className="btn btn-login">
            Login
          </Link>
          <Link to="/signup" className="btn btn-register">
            Register
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Donate Blood, Save Lives ❤️</h1>
        <p>
          Every drop counts! Join our mission to ensure that safe blood is
          available to those in need. Be a hero today by donating or registering
          as a recipient.
        </p>
        <div className="hero-buttons">
          <Link to="/donate" className="btn btn-primary">
            Become a Donor
          </Link>
          <Link to="/request" className="btn btn-outline">
            Request Blood
          </Link>
        </div>
      </section>

      {/* Awareness Section */}
      <section className="awareness">
        <h2>Why Blood Donation Matters?</h2>
        <div className="awareness-cards">
          <div className="card">
            <h3>🩸 Save Lives</h3>
            <p>
              A single donation can save up to 3 lives. Blood is essential for
              accident victims, surgeries, and cancer patients.
            </p>
          </div>
          <div className="card">
            <h3>💪 Stay Healthy</h3>
            <p>
              Donating blood improves heart health, reduces harmful iron stores,
              and stimulates blood cell production.
            </p>
          </div>
          <div className="card">
            <h3>🤝 Community Support</h3>
            <p>
              Blood donation strengthens community bonds and ensures emergency
              readiness for all.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about">
        <h2>About Us</h2>
        <p>
          We are a non-profit Blood Bank Management System dedicated to saving
          lives. Our mission is to connect voluntary donors with patients in
          urgent need of blood, ensuring safe and timely availability.
        </p>
        <p>
          With a strong network of hospitals and donors, we aim to build a
          self-sufficient community where no life is lost due to lack of blood.
        </p>
      </section>

      {/* Contact Us Section */}
      <section className="contact">
        <h2>Contact Us</h2>
        <p>
          <strong>📍 Address:</strong> 13-292 , Rajupeta , MainRoad, Tiruvuru,
          India
        </p>
        <p>
          <strong>📞 Phone:</strong> +91 98765 43210
        </p>
        <p>
          <strong>📧 Email:</strong> support@bloodbank.org
        </p>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="4"></textarea>
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Blood Bank Management | All Rights Reserved</p>
      </footer>
    </div>
  );
}
