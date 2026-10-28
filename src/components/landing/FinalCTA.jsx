import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./FinalCTA.css";

export default function FinalCTA() {
  return (
    <section className="landing-cta">
      <div className="cta-inner">
        <span className="cta-lable">
          YOUR NEXT STEP
        </span>

        <h2>
          Better insights.
          <br />
          <span>Healthier harvests.</span>
        </h2>

        <p>
          Start exploring AI-powered crop health analysis
          and take a closer look at your plants.
        </p>

        <Link to="/register" className="cta-button">
            <span>GET STARTED</span>
            <ArrowUpRight size={17} />
        </Link>
      </div>

      <span className="cta-decoration" aria-hidden="true">
        C
      </span>
    </section>
  );
}