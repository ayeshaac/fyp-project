import "../styles/PartnerPage.css";

function PartnersPage({ onOpen }) {
  const partners = [
    { name: "Sybrid", logo: "public/logos/sybrid.png" },
    { name: "Bank Alfalah", logo: "public/logos/alfalah.jfif" },
    { name: "Faysal Bank", logo: "public/logos/faysal.png" },
    { name: "Faysal Bank Islamic", logo: "public/logos/easypysa.png" },
    { name: "Ufone", logo: "public/logos/ufonr.png" },
    { name: "Easypaisa", logo: "public/logos/jazzcash.jfif" },
    { name: "Jubilee Insurance", logo: "public/logos/jublee.jfif" },
    { name: "Zong 4G", logo: "public/logos/zong.png" },
  ];

  return (
    <section className="partners-section">
      <h2 className="partners-title">Our Esteemed Partners</h2>
      <p className="partners-subtitle">
        Avail exclusive partnership benefits for your brand, clients and employees.
      </p>

      <button className="primaryBtn" onClick={onOpen}>
        Partner with VetoCare
      </button>

      <div className="partners-grid-wrapper">
        <div className="partners-grid">
          {partners.map((partner, index) => (
            <div className="partner-card" key={index}>
              <img
                src={partner.logo}
                alt={partner.name}
                className="partner-logo"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Right arrow (optional UI only) */}
        <div className="partners-arrow">›</div>
      </div>
    </section>
  );
}

export default PartnersPage;
