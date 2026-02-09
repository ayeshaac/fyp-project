import React from "react";
import HeroSurgery from "./Hero_Surgery";
import SurgeryPage from "./surgery_specialization";
import Footer from "../../components/Footer";
import WebsiteHighlights from "./WebsiteHighlights";

export default function Surgery() {
  return (
    <>
      {/* Hero Section */}
     < HeroSurgery />

      <SurgeryPage />
      
      <Footer />
    </>
  );
}

