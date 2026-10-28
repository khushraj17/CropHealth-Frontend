import { useEffect, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Leaf,
  ScanLine,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    label: "Total Scans",
    value: 1284,
    change: "+12.8%",
    description: "vs. previous month",
    icon: ScanLine,
    trend: "up",
  },
  {
    label: "Healthy Leaves",
    value: 846,
    change: "+8.2%",
    description: "vs. previous month",
    icon: Leaf,
    trend: "up",
  },
  {
    label: "Diseases Detected",
    value: 438,
    change: "-4.3%",
    description: "vs. previous month",
    icon: Activity,
    trend: "down",
  },
  {
    label: "Model Accuracy",
    value: 96.8,
    suffix: "%",
    change: "+1.4%",
    description: "model performance",
    icon: ShieldCheck,
    trend: "up",
  },
];

const diseaseData = [
  { name: "Healthy", count: 846, color: "#48e69a" },
  { name: "Early Blight", count: 196, color: "#e9b45b" },
  { name: "Late Blight", count: 142, color: "#ed795f" },
  { name: "Leaf Mold", count: 100, color: "#9a8cf5" },
];

const recentScans = [
  {
    id: "CS-1048",
    name: "Tomato leaf sample",
    disease: "Healthy",
    confidence: 98.4,
    status: "healthy",
    time: "2 min ago",
  },
  {
    id: "CS-1047",
    name: "Tomato leaf sample",
    disease: "Early Blight",
    confidence: 94.7,
    status: "warning",
    time: "18 min ago",
  },
  {
    id: "CS-1046",
    name: "Tomato leaf sample",
    disease: "Late Blight",
    confidence: 97.1,
    status: "danger",
    time: "42 min ago",
  },
  {
    id: "CS-1045",
    name: "Tomato leaf sample",
    disease: "Healthy",
    confidence: 96.2,
    status: "healthy",
    time: "1 hour ago",
  },
];

function AnimatedNumber({ value, suffix = "" }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame;
    let startTime;

    const duration = 1000;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      setDisplay(value * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [value]);

  const formatted = Number.isInteger(value)
    ? Math.round(display).toLocaleString("en-IN")
    : display.toFixed(1);

  return (
    <>
      {formatted}
      {suffix}
    </>
  );
}

function StatCard({ stat, index }) {
  const Icon = stat.icon;
  const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <article
      className="stat-card"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="stat-card-top">
        <span className="stat-icon">
          <Icon size={20} strokeWidth={1.8} />
        </span>

        <span className={`stat-change ${stat.trend}`}>
          <TrendIcon size={14} />
          {stat.change}
        </span>
      </div>

      <p className="stat-label">{stat.label}</p>

      <div className="stat-value">
        <AnimatedNumber value={stat.value} suffix={stat.suffix} />
      </div>

      <p className="stat-description">{stat.description}</p>
    </article>
  );
}

function DiseaseDistribution() {
  const total = diseaseData.reduce((sum, item) => sum + item.count, 0);

  let currentOffset = 0;

  const segments = diseaseData.map((item) => {
    const percentage = (item.count / total) * 100;
    const segment = {
      ...item,
      percentage,
      offset: currentOffset,
    };

    currentOffset += percentage;
    return segment;
  });

  return (
    <section className="dashboard-panel distribution-panel">
      <div className="panel-heading">
        <div>
          <span className="panel-kicker">CLASSIFICATION</span>
          <h2>Disease distribution</h2>
          <p>Breakdown of analyzed leaf samples</p>
        </div>

        <span className="panel-icon">
          <Activity size={19} />
        </span>
      </div>

      <div className="distribution-content">
        <div
          className="donut-chart"
          role="img"
          aria-label="Disease distribution chart"
          style={{
            background: `conic-gradient(${segments
              .map(
                (item) =>
                  `${item.color} ${item.offset}% ${item.offset + item.percentage}%`,
              )
              .join(", ")})`,
          }}
        >
          <div className="donut-center">
            <span>Total samples</span>
            <strong>{total.toLocaleString("en-IN")}</strong>
            <small>Analyzed</small>
          </div>
        </div>

        <div className="distribution-legend">
          {segments.map((item) => (
            <div className="legend-item" key={item.name}>
              <span
                className="legend-dot"
                style={{ background: item.color }}
              />

              <div className="legend-copy">
                <span>{item.name}</span>
                <strong>{item.count.toLocaleString("en-IN")}</strong>
              </div>

              <span className="legend-percentage">
                {item.percentage.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="panel-footnote">
        <span className="online-dot" />
        Illustrative sample data
      </div>
    </section>
  );
}

function RecentScans({ onViewAll }) {
  return (
    <section className="dashboard-panel recent-panel">
      <div className="panel-heading">
        <div>
          <span className="panel-kicker">SCAN ACTIVITY</span>
          <h2>Recent scans</h2>
          <p>Latest leaf classification results</p>
        </div>

        <button
          type="button"
          className="text-action"
          onClick={onViewAll}
        >
          View all <ArrowRight size={15} />
        </button>
      </div>

      <div className="scan-list">
        {recentScans.map((scan) => (
          <article className="scan-row" key={scan.id}>
            <div className={`scan-status-icon ${scan.status}`}>
              {scan.status === "healthy" ? (
                <CheckCircle2 size={19} />
              ) : (
                <Activity size={19} />
              )}
            </div>

            <div className="scan-info">
              <strong>{scan.name}</strong>
              <span>
                {scan.id} <span className="scan-separator">·</span>{" "}
                {scan.time}
              </span>
            </div>

            <div className="scan-result">
              <span className={`disease-badge ${scan.status}`}>
                {scan.disease}
              </span>
              <span className="scan-confidence">
                {scan.confidence}% confidence
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="panel-footnote">
        <Clock3 size={14} />
        Demo records — not fetched from the backend
      </div>
    </section>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            PLANT HEALTH INTELLIGENCE
          </div>

          <h1>
            Grow healthier.
            <br />
            <span>One scan at a time.</span>
          </h1>

          <p>
            Monitor plant health, detect tomato leaf diseases, and turn
            predictions into informed decisions.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="primary-action"
              onClick={() => navigate("/detect")}
            >
              <ScanLine size={18} />
              Scan a leaf
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className="secondary-action"
              onClick={() => navigate("/diseases")}
            >
              Explore diseases
            </button>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />

          <div className="hero-plant">
            <Sprout size={112} strokeWidth={0.85} />
          </div>

          <div className="floating-chip chip-top">
            <span className="chip-status" />
            <span>AI ready</span>
          </div>

          <div className="floating-chip chip-bottom">
            <ShieldCheck size={17} />
            <span>Plant health insights</span>
          </div>

          <div className="hero-index">CS / 01</div>
        </div>

        <div className="hero-bottom-line">
          <span>BUILT FOR SMARTER AGRICULTURE</span>
          <span>PRECISION · PREVENTION · GROWTH</span>
        </div>
      </section>

      <section className="stats-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">YOUR WORKSPACE</span>
            <h2>Plant health overview</h2>
          </div>

          <span className="data-period">DEMO METRICS</span>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </section>

      <section className="dashboard-grid">
        <DiseaseDistribution />

        <RecentScans onViewAll={() => navigate("/history")} />
      </section>

      <footer className="dashboard-footer">
        <div>
          <span className="footer-leaf">
            <Leaf size={17} />
          </span>
          <span>Better insights. Healthier harvests.</span>
        </div>

        <span>CropSense AI · Plant health workspace</span>
      </footer>
    </div>
  );
}