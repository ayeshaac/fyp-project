import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cards from "./components/cards";
import VetSpecialties from "./components/vetSpecialties";
import PartnersPage from "./components/PartnersPage";
import PartnerFormModal from "./components/PartnerFormModal";
import NewsSection from "./components/NewsSection";
import Testimonials from "./components/Testimonials";
import VetocareDownloadHero from "./components/VetocareDownloadHero";
import DoctorsGrid from "./components/DoctorsGrid";
import Footer from "./components/Footer";

function App() {
  const [openPartner, setOpenPartner] = useState(false);

  return (
    <>
      <Navbar />
      <Hero />
      <Cards />
      <VetSpecialties />

      {/* Partners Section */}
      <PartnersPage onOpen={() => setOpenPartner(true)} />

      {/* Modal */}
      {openPartner && (
        <PartnerFormModal onClose={() => setOpenPartner(false)} />
      )}
      <NewsSection />
      <Testimonials />
      <VetocareDownloadHero />
      <DoctorsGrid />
      <Footer />
    </>
  );
}

export default App;
