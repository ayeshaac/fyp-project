import React from "react";
import "./surgery_specialization.css";
export default function WebsiteHighlights() {
  const highlights = [
    { icon: "🏥", title: "Clean & Sterile OT" },
    { icon: "🩻", title: "X-Ray / Ultrasound" },
    { icon: "🧫", title: "In-house Lab Tests" },
    { icon: "💤", title: "Safe Anesthesia" },
    { icon: "📈", title: "Vitals Monitoring" },
    { icon: "🩹", title: "Wound Dressing" },

    { icon: "🚑", title: "Emergency Support" },
    { icon: "📞", title: "24/7 Guidance" },
    { icon: "💊", title: "Medicines Plan" },
    { icon: "🥣", title: "Diet Instructions" },
    { icon: "🧾", title: "Clear Estimates" },
    { icon: "❤️", title: "Follow-up Care" },
  ];

  return (
    <section className="picSection">
      <div className="picHeader">
        <h2>Facilities & Care</h2>
        <p>Everything your pet needs — from diagnostics to recovery.</p>
      </div>

      <div className="picGrid">
        {highlights.map((x) => (
          <div className="picItem" key={x.title}>
            <div className="picCircle">
              <span className="picIcon">{x.icon}</span>
            </div>
            <div className="picLabel">{x.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
