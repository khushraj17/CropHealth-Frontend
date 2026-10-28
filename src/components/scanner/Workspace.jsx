import { useRef, useState, useEffect } from "react";
import {
  Upload,
  Image as ImageIcon,
  X,
  Leaf,
  ArrowRight,
  ScanLine,
  CheckCircle2,
} from "lucide-react";

import "./Workspace.css";
import api from "../../services/api"

export default function ScannerWorkspace() {
  const fileInputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [scanId, setScanId] = useState(null);

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  function handleFile(file) {
    if (!file) return;

    setError("");

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please select a JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10 MB.");
      return;
    }
    setPrediction(null);
    setScanId(null);

    setSelectedImage(URL.createObjectURL(file));
    setFileName(file.name);
  }

  function handleDrop(event) {
    event.preventDefault();
    handleFile(event.dataTransfer.files?.[0]);
  }

  function clearImage() {
    setSelectedImage(null);
    setFileName("");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

async function handleAnalyze() {
  const file = fileInputRef.current?.files?.[0];

  if (!file || isAnalyzing) return;

  setIsAnalyzing(true);
  setError("");
  setPrediction(null);
  setScanId(null);

  try {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("crop_type", "tomato");

    const response = await api.post("/scans/upload", formData);

    const data = response.data;

    setScanId(data.id);

    if (data.prediction) {
      setPrediction(data.prediction);
    } else {
      const scanResponse = await api.get(`/scans/${data.id}`);

      setPrediction(scanResponse.data.prediction);
    }
  } catch (err) {
    console.error("Crop disease prediction failed:", err);

    setError(
      err.response?.data?.detail ||
        "Analysis failed. Please check your backend connection and try again."
    );
  } finally {
    setIsAnalyzing(false);
  }
}

  return (
    <main className="scanner-workspace">
      <section className="scanner-workspace__intro">
        <span className="scanner-workspace__eyebrow">
          <Leaf size={15} />
          INTELLIGENT CROP DIAGNOSTICS
        </span>

        <h1>
          Understand your crops.
          <br />
          <span>One leaf at a time.</span>
        </h1>

        <p>
          Upload a tomato leaf image and let AI help you identify
          potential diseases.
        </p>
      </section>

      <section className="scanner-card">
        <div className="scanner-card__header">
          <div className="scanner-card__title">
            <span className="scanner-card__icon">
              <ScanLine size={19} />
            </span>

            <div>
              <h2>Leaf Scanner</h2>
              <p>Upload an image to begin your analysis.</p>
            </div>
          </div>

          <span className="scanner-card__badge">
            <span />
            AI SCANNER
          </span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          hidden
          onChange={(event) => handleFile(event.target.files?.[0])}
        />

        <div
          className={`scanner-dropzone ${
            selectedImage ? "scanner-dropzone--selected" : ""
          }`}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          {selectedImage ? (
            <div className="scanner-preview">
              <img src={selectedImage} alt="Selected tomato leaf" />

              <div className="scanner-preview__info">
                <div className="scanner-preview__file-icon">
                  <ImageIcon size={18} />
                </div>

                <div className="scanner-preview__file-text">
                  <strong title={fileName}>{fileName}</strong>
                  <span>
                    <CheckCircle2 size={13} />
                    Image ready for analysis
                  </span>
                </div>

                <button
                  type="button"
                  className="scanner-preview__remove"
                  onClick={clearImage}
                  aria-label="Remove image"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="scanner-dropzone__content">
              <div className="scanner-dropzone__icon">
                <Upload size={25} strokeWidth={1.5} />
              </div>

              <h3>Drop your leaf image here</h3>

              <p>Drag and drop your image or browse your files</p>

              <button
                type="button"
                className="scanner-browse-button"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon size={16} />
                Choose an image
              </button>

              <span className="scanner-dropzone__formats">
                JPG, PNG or WEBP <span>·</span> Maximum 10 MB
              </span>
            </div>
          )}
        </div>

        {error && (
          <p className="scanner-workspace__error" role="alert">
            {error}
          </p>
        )}

        <div className="scanner-tips">
          <div className="scanner-tips__heading">
            <Leaf size={15} />
            <span>FOR BETTER RESULTS</span>
          </div>

          <div className="scanner-tips__items">
            <div className="scanner-tip">
              <span className="scanner-tip__number">01</span>
              <div>
                <strong>Clear image</strong>
                <p>Keep the leaf in focus.</p>
              </div>
            </div>

            <div className="scanner-tip">
              <span className="scanner-tip__number">02</span>
              <div>
                <strong>Good lighting</strong>
                <p>Avoid dark or blurry photos.</p>
              </div>
            </div>

            <div className="scanner-tip">
              <span className="scanner-tip__number">03</span>
              <div>
                <strong>Show the leaf</strong>
                <p>Keep the leaf clearly visible.</p>
              </div>
            </div>
          </div>
        </div>

        <button
            type="button"
            className={`scanner-analyze-button ${
                isAnalyzing ? "scanner-analyze-button--loading" : ""
            }`}
            disabled={!selectedImage || isAnalyzing}
            onClick={handleAnalyze}
            >
            <span className="scanner-analyze-button__content">
                <ScanLine
                size={18}
                className={isAnalyzing ? "scanner-scan-icon" : ""}
                />

                {isAnalyzing ? "Analyzing leaf..." : "Analyze leaf"}

                {!isAnalyzing && (
                <ArrowRight
                    size={17}
                    className="scanner-analyze-button__arrow"
                />
                )}
            </span>

            <span className="scanner-analyze-button__shine" />
        </button>

        {prediction && (
        <section className="scanner-result" aria-live="polite">
            <div className="scanner-result__header">
            <span className="scanner-result__icon">
                <Leaf size={20} />
            </span>

            <div>
                <span className="scanner-result__eyebrow">
                ANALYSIS COMPLETE
                </span>
                <h3>Scan results</h3>
            </div>

            <CheckCircle2
                size={21}
                className="scanner-result__check"
            />
            </div>

            <div className="scanner-result__body">
            <span className="scanner-result__label">
                DETECTED CONDITION
            </span>

            <h4>
                {String(prediction.disease || "Unknown")
                .replace(/^Tomato___/, "")
                .replaceAll("_", " ")}
            </h4>

            <div className="scanner-result__confidence">
                <div>
                <span>Model confidence</span>
                <strong>
                    {Number(prediction.confidence).toFixed(2)}%
                </strong>
                </div>

                <div
                className="scanner-result__track"
                role="progressbar"
                aria-label="Model confidence"
                aria-valuenow={Number(prediction.confidence) || 0}
                aria-valuemin={0}
                aria-valuemax={100}
                >
                <span
                    style={{
                    width: `${Math.min(
                        100,
                        Math.max(0, Number(prediction.confidence) || 0)
                    )}%`,
                    }}
                />
                </div>
            </div>

            {scanId && (
                <p className="scanner-result__id">
                Scan ID: {scanId}
                </p>
            )}
            </div>

            <p className="scanner-result__note">
            This is an AI-generated prediction, not a definitive
            diagnosis. Consult an agricultural expert before
            making treatment decisions.
            </p>
        </section>
        )}

        <p className="scanner-card__disclaimer">
          <Leaf size={13} />
          AI results are estimates and should be verified when necessary.
        </p>
      </section>

      <div className="scanner-workspace__footer">
        <span>OBSERVE</span>
        <span className="scanner-workspace__footer-line" />
        <span>ANALYZE</span>
        <span className="scanner-workspace__footer-line" />
        <span>GROW BETTER</span>
      </div>
    </main>
  );
}