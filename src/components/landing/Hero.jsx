import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./Hero.css";

import heroImage from "../../assets/image/meric-tuna-CE1OvMrZumQ-unsplash.jpg";

export default function Hero() {
  return (
    <section className="landing-hero">
      <div
        className="hero-background"
        style={{ backgroundImage: `url("${heroImage}")` }}
      />

      <div className="hero-grain" />

      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="eyebrow-line" />
          INTELLIGENCE FOR HEALTHIER CROPS
        </div>

        <h1 className="hero-title">
          Every leaf
          <br />
          tells a <span>story.</span>
        </h1>

        <p className="hero-description">
          Look closer at the health of your crops.
          Use AI-powered analysis to identify potential
          plant diseases from a simple image.
        </p>

        <div className="hero-actions">
          <Link to="/scanner" className="hero-primary-button">
            EXPLORE CROP HEALTH
            <ArrowUpRight size={17} />
          </Link>

          <a href="#technology" className="hero-secondary-button">
            DISCOVER OUR APPROACH
          </a>
        </div>
      </div>

      <div className="hero-bottom">
        <span>OBSERVE. ANALYSE. UNDERSTAND.</span>

        <a href="#technology" className="scroll-indicator">
          SCROLL TO EXPLORE
          <ArrowDown size={14} />
        </a>

        <span>AGRICULTURAL INTELLIGENCE</span>
      </div>

      <div className="hero-index">
        FIELD STUDY <span>— 001</span>
      </div>
    </section>
  );
}