import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import ScannerPage from "./pages/ScannerPage/ScannerPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/scanner" element={<ScannerPage/>} />
      </Routes>
    </BrowserRouter>
  );
}