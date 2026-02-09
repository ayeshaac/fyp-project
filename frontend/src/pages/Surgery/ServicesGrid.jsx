import React from "react";

const services = [
  { title: "Spay / Neuter", icon: "🐾" },
  { title: "Dental Cleaning", icon: "🦷" },
  { title: "Soft Tissue Surgery", icon: "🩺" },
  { title: "Orthopedic Surgery", icon: "🦴" },
  { title: "C-Section (Pets)", icon: "👶" },
  { title: "Tumor Removal", icon: "🔬" },

  { title: "Wound & Abscess Care", icon: "🩹" },
  { title: "Ear Surgery", icon: "👂" },
  { title: "Eye Surgery", icon: "👁️" },
  { title: "Fracture Repair", icon: "🦴" },
  { title: "Hernia Repair", icon: "🧵" },
  { title: "Foreign Body Removal", icon: "⚠️" },

  { title: "Vaccination", icon: "💉" },
  { title: "Deworming", icon: "🪱" },
  { title: "Skin & Allergy", icon: "🌿" },
  { title: "Diagnostics (Lab)", icon: "🧫" },
  { title: "Ultrasound / X-Ray", icon: "🩻" },
  { title: "Emergency Care", icon: "🚑" },

   { title: "Spay / Neuter", icon: "🐾" },
  { title: "Dental Cleaning", icon: "🦷" },
  { title: "Soft Tissue Surgery", icon: "🩺" },
  { title: "Orthopedic Surgery", icon: "🦴" },
  { title: "C-Section (Pets)", icon: "👶" },
  { title: "Tumor Removal", icon: "🔬" },

  { title: "Wound & Abscess Care", icon: "🩹" },
  { title: "Ear Surgery", icon: "👂" },
  { title: "Eye Surgery", icon: "👁️" },
  { title: "Fracture Repair", icon: "🦴" },
  { title: "Hernia Repair", icon: "🧵" },
  { title: "Foreign Body Removal", icon: "⚠️" },

  { title: "Vaccination", icon: "💉" },
  { title: "Deworming", icon: "🪱" },
  { title: "Skin & Allergy", icon: "🌿" },
  { title: "Diagnostics (Lab)", icon: "🧫" },
  { title: "Ultrasound / X-Ray", icon: "🩻" },
  { title: "Emergency Care", icon: "🚑" },
];

export default function ServicesGrid() {
  return (
    <section style={styles.grid}>
      {services.map((s) => (
        <div key={s.title} style={styles.item}>
          <div style={styles.circle}>
            <span style={styles.icon}>{s.icon}</span>
          </div>
          <div style={styles.label}>{s.title}</div>
        </div>
      ))}
    </section>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
    gap: 28,
    padding: "18px 8px",
  },

  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 10,
  },

  circle: {
    width: 56,
    height: 56,
    borderRadius: "999px",
    background: "#f2f4f8",
    display: "grid",
    placeItems: "center",
  },

  icon: {
    fontSize: 22,
  },

  label: {
    fontSize: 12.5,
    maxWidth: 110,
    lineHeight: 1.25,
  },
};
