import { ArrowUpRight } from "lucide-react";
import "./Introduction.css";

export default function Introduction() {
  return (
    <section className="landing-intro" id="about">
      <div className="intro-label">
        <span>01 / THE PURPOSE</span>
        <span>UNDERSTANDING PLANT HEALTH</span>
      </div>

      <div className="intro-content">
        <h2>
          Healthy crops begin
          <br />
          with <span>better observation.</span>
        </h2>

        <div className="intro-description">
          <p>
            A change in a leaf can reveal important information
            about a plant's condition. Identifying these signs
            early can help farmers make more informed decisions.
          </p>

          <p>
            Crop Health brings AI-powered image analysis into
            the process, helping users examine crop images
            and understand potential plant health issues.
          </p>

          <a href="/#technology" className="text-link">
            EXPLORE OUR APPROACH
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}