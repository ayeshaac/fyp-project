import { useState } from "react";
import {
  FaStethoscope,
  FaDog,
  FaCat,
  FaBone,
  FaHeart,
  FaBrain,
  FaAppleAlt,
  FaSyringe,
  FaXRay,
  FaEye,
  FaAmbulance,
  FaMicroscope,
} from "react-icons/fa";
import "../styles/VetSpecialties.css";


const vetSpecialties = [
  { name: "General Vet", icon: FaStethoscope, color: "#2563eb" },
  { name: "Dermatology", icon: FaDog, color: "#ec4899" },
  { name: "Surgery", icon: FaSyringe, color: "#f97316" },
  { name: "Dentistry", icon: FaCat, color: "#8b5cf6" },
  { name: "Orthopedics", icon: FaBone, color: "#10b981" },

  { name: "Cardiology", icon: FaHeart, color: "#ef4444" },
  { name: "Neurology", icon: FaBrain, color: "#6366f1" },
  { name: "Nutrition", icon: FaAppleAlt, color: "#22c55e" },
  { name: "Radiology", icon: FaXRay, color: "#0ea5e9" },
  { name: "Ophthalmology", icon: FaEye, color: "#14b8a6" },

  { name: "Emergency Care", icon: FaAmbulance, color: "#dc2626" },
  { name: "Pathology", icon: FaMicroscope, color: "#a855f7" },
  { name: "Physiotherapy", icon: FaDog, color: "#f59e0b" },
  { name: "Rehabilitation", icon: FaBone, color: "#22d3ee" },
  { name: "Exotic Animals", icon: FaCat, color: "#fb7185" },

  { name: "Livestock", icon: FaDog, color: "#4ade80" },
  { name: "Poultry", icon: FaCat, color: "#f472b6" },
  { name: "Vaccination", icon: FaSyringe, color: "#38bdf8" },
  { name: "Grooming", icon: FaDog, color: "#c084fc" },
  { name: "Wellness", icon: FaHeart, color: "#fb923c" },

  { name: "Training", icon: FaDog, color: "#34d399" },
  { name: "Ultrasound", icon: FaXRay, color: "#60a5fa" },
  { name: "X-Ray", icon: FaXRay, color: "#818cf8" },
  { name: "Preventive Care", icon: FaStethoscope, color: "#2dd4bf" },
  { name: "Pain Management", icon: FaHeart, color: "#f43f5e" },

  { name: "Microbiology", icon: FaMicroscope, color: "#a78bfa" },
  { name: "Parasitology", icon: FaMicroscope, color: "#facc15" },
  { name: "Behaviorist", icon: FaBrain, color: "#22c55e" },
  { name: "Nutrition Plus", icon: FaAppleAlt, color: "#84cc16" },
  { name: "Pet Wellness", icon: FaHeart, color: "#fb7185" },
];

export default function VetSpecialties() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <div className="vet-header">
        <h3>Consult Online Doctors</h3>
        <button className="view-all" onClick={() => setOpen(true)}>
          View All
        </button>
      </div>

      {/* HOME → 2 ROWS × 5 */}
      <div className="home-grid">
        {vetSpecialties.slice(0, 10).map((item, i) => {
          const Icon = item.icon;
          return (
            <div className="home-card" key={i}>
              <div
                className="icon-circle"
                style={{
                  backgroundColor: item.color + "20",
                  color: item.color,
                }}
              >
                <Icon />
              </div>
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>

      {/* POPUP */}
{open && (
  <div className="overlay" onClick={() => setOpen(false)}>
    <div className="popup" onClick={(e) => e.stopPropagation()}>
      
      {/* POPUP HEADER */}
      <div className="popup-header">
        <h4>Find a doctor online</h4>
        <button onClick={() => setOpen(false)}>✕</button>
      </div>

      {/* SEARCH BOX */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for specialization"
        />
      </div>

      {/* POPUP GRID → 3 COLUMNS */}
      <div className="popup-grid">
        {vetSpecialties.map((item, i) => {
          const Icon = item.icon;
          return (
            <div className="doctor-card" key={i}>
              <div
                className="doctor-icon"
                style={{
                  backgroundColor: item.color + "20",
                  color: item.color,
                }}
              >
                <Icon />
              </div>

              <div className="doctor-info">
                <p className="doctor-name">{item.name}</p>
                <span className="online-badge">ONLINE</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
)}

    </>
  );
}
