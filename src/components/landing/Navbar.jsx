import { ArrowUpRight, ScanLine } from "lucide-react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="landing-nav">
      <Link to="/" className="landing-brand">
        <span className="brand-mark">C</span>
        <span>CROPSENSE AI</span>
      </Link>

      <nav className="landing-nav-links" aria-label="Main navigation">
        <Link to="/">Home</Link>
        <a href="#technology">Technology</a>
        <a href="#about">About</a>
      </nav>

      <div className="landing-nav-actions">
        <Link to="/login" className="nav-login-link">
          LOGIN
        </Link>

        <Link to="/register" className="nav-scan-link">
          <ScanLine size={15} />
          <span>GET STARTED</span>
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </header>
  );
}