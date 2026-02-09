import { useState } from "react";
import Hero from "../components/Hero";
import Cards from "../components/cards";
import VetSpecialties from "../components/vetSpecialties";
import PartnersPage from "../components/PartnersPage";
import PartnerFormModal from "../components/PartnerFormModal";
import NewsSection from "../components/NewsSection";
import Testimonials from "../components/Testimonials";
import VetocareDownloadHero from "../components/VetocareDownloadHero";
import DoctorsGrid from "../components/DoctorsGrid";
import Footer from "../components/Footer";

export default function Home() {
  const [openPartner, setOpenPartner] = useState(false);

  return (
    <>
      <Hero />
      <Cards />
      <VetSpecialties />

      <PartnersPage onOpen={() => setOpenPartner(true)} />
      {openPartner && <PartnerFormModal onClose={() => setOpenPartner(false)} />}

      <NewsSection />
      <Testimonials />
      <VetocareDownloadHero />
      <DoctorsGrid />
      <Footer />
    </>
  );
}
