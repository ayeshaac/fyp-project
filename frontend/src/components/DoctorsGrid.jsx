import React from "react";
import "../styles/DoctorsGrid.css";

const data = [
  {
    title: "Doctors in Lahore",
    items: [
      "Best Dermatologist in Lahore",
      "Best Gynecologist in Lahore",
      "Best Urologist in Lahore",
      "Best Sexologist in Lahore",
      "Best Internal Medicine Specialist in Lahore",
      "Best Child Specialist in Lahore",
      "Best Orthopedic Surgeon in Lahore",
      "Best Eye Specialist in Lahore",
      "Best ENT Specialist in Lahore",
      "Best Cardiologist in Lahore",
      "Best Neurologist in Lahore",
      "Best Nephrologist in Lahore",
    ],
  },
  {
    title: "Doctors in Karachi",
    items: [
      "Best Dermatologist in Karachi",
      "Best Gynecologist in Karachi",
      "Best Urologist in Karachi",
      "Best Sexologist in Karachi",
      "Best Internal Medicine Specialist in Karachi",
      "Best Child Specialist in Karachi",
      "Best Orthopedic Surgeon in Karachi",
      "Best Eye Specialist in Karachi",
      "Best ENT Specialist in Karachi",
      "Best Cardiologist in Karachi",
      "Best Neurologist in Karachi",
      "Best Nephrologist in Karachi",
    ],
  },
  {
    title: "Doctors in Islamabad",
    items: [
      "Best Dermatologist in Islamabad",
      "Best Gynecologist in Islamabad",
      "Best Urologist in Islamabad",
      "Best Sexologist in Islamabad",
      "Best Internal Medicine Specialist in Islamabad",
      "Best Child Specialist in Islamabad",
      "Best Orthopedic Surgeon in Islamabad",
      "Best Eye Specialist in Islamabad",
      "Best ENT Specialist in Islamabad",
      "Best Cardiologist in Islamabad",
      "Best Neurologist in Islamabad",
      "Best Nephrologist in Islamabad",
    ],
  },
  {
    title: "Doctors in Other Cities",
    items: [
      "Best Nephrologist in Multan",
      "Best Pulmonologist in Multan",
      "Best Cardiologist in Multan",
      "Best Neuro Physician in Multan",
      "Best Gynecologist in Peshawar",
      "Best Urologist in Faisalabad",
      "Best Dentist in Faisalabad",
      "Best Dermatologist in Faisalabad",
      "Best Gynecologist in Gujranwala",
      "Best Neurologist in Multan",
      "Best Psychiatrist in Faisalabad",
      "Best Dermatologist in Gujranwala",
    ],
  },
];

export default function DoctorsGrid() {
  return (
    <section className="dg-wrap">
      <div className="dg-grid">
        {data.map((col) => (
          <div className="dg-col" key={col.title}>
            <h3 className="dg-title">{col.title}</h3>

            <ul className="dg-list">
              {col.items.map((text) => (
                <li className="dg-item" key={text}>
                  <a href="#" className="dg-link">
                    <span className="dg-icon" aria-hidden="true">
                      ›
                    </span>
                    <span className="dg-text">{text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
