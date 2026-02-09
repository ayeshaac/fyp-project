// App.jsx
import React from "react";
import "../styles/cards.css";

const cards = [
  {
    key: "online",
    title: "Consult Online Now",
    desc: "Instantly connect with Specialists\nthrough Video call.",
    img: "https://images.unsplash.com/photo-1580281658223-9b93f18ae9ae?auto=format&fit=crop&w=900&q=80",
    imgBg: "#eaf1ff",

    imgClassName: "imgContain",
  },
  {
    key: "clinic",
    title: "In-Clinic Appointments",
    desc: "Book an In-Person visit to\ndoctor's clinic.",
    img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=900&q=80",
    imgBg: "#FFE9D6",
  },
  {
    key: "lab",
    title: "Laboratory Tests",
    desc: "Avail Exclusive discounts on lab\ntests.",
    img: "assets/image 4.png",
    imgBg: "#EEF8EE",
  },
  {
    key: "surgery",
    title: "Procedures & Surgeries",
    desc: "Plan your surgeries at\ndiscounted rates.",
    img: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80",
    imgBg: "#FFF1F1",
  },
  {
    key: "meds",
    title: "Medicines",
    desc: "Know your medicines better",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80",
    imgBg: "#ffffff",
  },
];

export default function Cards() {
  return (
    <div className="page">
      <div className="row">
        {cards.map((c) => (
          <div className="card" key={c.key}>
            <div className="media" style={{ background: c.imgBg }}>
              <img
                className={`mediaImg ${c.imgClassName || "imgCover"}`}
                src={c.img}
                alt={c.title}
              />

              {c.badge && (
                <div className="badge" style={{ background: c.badge.bg }}>
                  {c.badge.dot && <span className="badgeDot" />}
                  <span className="badgeText">{c.badge.text}</span>
                </div>
              )}
            </div>

            <div className="content">
              <div className="title">{c.title}</div>
              <div className="desc">{c.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
