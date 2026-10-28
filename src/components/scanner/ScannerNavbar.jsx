import { NavLink, Link } from "react-router-dom";
import { Leaf, ArrowUpRight } from "lucide-react";
import "./ScannerNavbar.css";

export default function ScannerNavbar() {
  return (
    <header className="scanner-navbar">
      <Link to="/" className="scanner-navbar__brand">
        <span className="scanner-navbar__logo">
          <Leaf size={21} strokeWidth={1.7} />
        </span>

        <span className="scanner-navbar__brand-text">
          <strong>CropSense</strong>
          <span>INTELLIGENCE</span>
        </span>
      </Link>

      <nav className="scanner-navbar__links" aria-label="Main navigation">
        <NavLink
          to="/scanner"
          className={({ isActive }) =>
            `scanner-navbar__link ${isActive ? "active" : ""}`
          }
        >
          Scanner
        </NavLink>

        <span className="scanner-navbar__link scanner-navbar__link--disabled">
          History
          <span className="scanner-navbar__coming-soon">SOON</span>
        </span>

        <span className="scanner-navbar__link scanner-navbar__link--disabled">
          Dashboard
          <span className="scanner-navbar__coming-soon">SOON</span>
        </span>
      </nav>

      <div className="scanner-navbar__status">
        <span className="scanner-navbar__status-dot" />
        <span>AI SYSTEM</span>
        <ArrowUpRight size={15} />
      </div>
    </header>
  );
}