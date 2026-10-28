import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Introduction from "../../components/landing/Inroduction";
import Technology from "../../components/landing/Technology";
import FinalCTA from "../../components/landing/FinalCTA";
import Footer from "../../components/landing/Footer";


import "./LandingPage.css";
import useScrollReveal from "../../hooks/useScrollReveal";

export default function LandingPage() {
  useScrollReveal();

  return (
    <div className="landing-page">

      <Navbar/>
      <Hero/>
      <Introduction/>
      <Technology/>
      <FinalCTA/>
      <Footer/>

    </div>
  );
}