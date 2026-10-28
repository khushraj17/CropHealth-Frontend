import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import technologyImage from "../../assets/image/isaac-sloman-y2pCSM6OnT4-unsplash.jpg";
import "./Technology.css";

export default function Technology() {
  return (
    <section className="landing-technology" id="technology">
      <div
        className="technology-image"
        style={{ "--technology-image": `url("${technologyImage}")` }}
        role="img"
        aria-label="Crop field representing agricultural technology"
        >
        <div className="technology-image-overlay" />
        </div>

      <div className="technology-content">
        <span className="tech-lable">
          02 / OUR TECHNOLOGY
        </span>

        <h2>
          Intelligence
          <br />
          for healthier <span>crops.</span>
        </h2>

        <p>
          Understanding crop health should be simpler. CropSense AI
          uses image-based analysis to help identify potential
          plant diseases from crop images.
        </p>

        <p>
          Upload an image, let the model analyse visible symptoms,
          and review the prediction to support your next decision.
        </p>

        <div className="process-list">
          <div className="process-item">
            <span>01</span>
            <div>
              <h3>Capture</h3>
              <p>Take or upload a clear image of the affected crop.</p>
            </div>
          </div>

          <div className="process-item">
            <span>02</span>
            <div>
              <h3>Analyse</h3>
              <p>AI examines the image and predicts a possible condition.</p>
            </div>
          </div>

          <div className="process-item">
            <span>03</span>
            <div>
              <h3>Understand</h3>
              <p>Review the result to help guide further investigation.</p>
            </div>
          </div>
        </div>

        <Link to="/register" className="technology-button">
          GET STARTED
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}

