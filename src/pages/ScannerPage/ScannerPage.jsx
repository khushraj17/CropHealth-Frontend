import ScannerNavbar from "../../components/scanner/ScannerNavbar";
import ScannerWorkspace from "../../components/scanner/Workspace";
import "./ScannerPage.css"

export default function ScannerPage() {
  return (
    <main className="scanner-page">
        <div className="scanner-background" aria-hidden="true" />
        
        <div className="scanner-content">
            <ScannerNavbar />
            <ScannerWorkspace />
        </div>
    </main>
  );
}