import { ArrowUpRight, ScanLine } from "lucide-react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="landing-footer">
      <div className="footer-main">
        <Link to="/" className="footer-brand">
          <span className="brand-mark">C</span>
          <span>CROPSENSE AI</span>
        </Link>

        <p className="footer-description">
          A smarter perspective on plant health,
          powered by artificial intelligence.
        </p>

        <Link to="/register" className="footer-action">
          START YOUR JOURNEY
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} CropSense AI</span>

        <nav aria-label="Footer navigation">
          <a href="/#about">ABOUT</a>
          <a href="/#technology">TECHNOLOGY</a>
          <Link to="/login">LOGIN</Link>
        </nav>

        <span className="footer-credit">
          <ScanLine size={14} />
          AI-POWERED CROP ANALYSIS
        </span>
      </div>
    </footer>
  );
}