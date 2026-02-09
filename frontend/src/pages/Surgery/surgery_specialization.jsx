import React from "react";
import "./surgery_specialization.css";
import SurgeryForm from "./SurgeryForm";
import ServicesGrid from "./ServicesGrid";
import WebsiteHighlights from "./WebsiteHighlights";

export default function SurgeryPage() {
  return (
    <div className="container">
      <div className="layout">
        {/* LEFT CONTENT */}
        <main className="content">
          <div className="hero">
            <h1>Specializing in Veterinary Surgeries</h1>
            <p>Trusted care for pets — consultations, diagnostics, and surgery planning.</p>
          </div>

          <ServicesGrid />

          {/* Extra dummy content just to show scroll */}
          <div className="extra">
            <h2>Why choose us?</h2>
         <WebsiteHighlights />

            <div style={{ height: 100 }} />
          </div>
        </main>

        {/* RIGHT STICKY FORM */}
        <aside className="sidebar">
          <SurgeryForm />
        </aside>
      </div>
    </div>
  );
}
