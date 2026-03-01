// FILE: frontend/src/pages/joinuser/UserDashboard.jsx
// ✅ Pure React (no UI libraries / no frameworks) + CSS inside same file

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  // You can later replace this with real data from backend
  const [userName, setUserName] = useState("Zubair");
  const [pets, setPets] = useState([
    {
      id: "p1",
      name: "Bella",
      age: "2 Years",
      breed: "Labrador",
      vaccination: "Up to date",
    },
    {
      id: "p2",
      name: "Max",
      age: "1 Year",
      breed: "German Shepherd",
      vaccination: "Due this month",
    },
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: "a1",
      vetName: "Dr. Ali",
      date: "25 June 2026",
      time: "3:00 PM",
      mode: "Online",
      status: "Confirmed",
    },
  ]);

  const [toast, setToast] = useState({ show: false, text: "", type: "info" });

  const stats = useMemo(() => {
    const upcoming = appointments.filter((a) => a.status !== "Cancelled").length;
    return {
      petsCount: pets.length,
      upcomingCount: upcoming,
    };
  }, [pets, appointments]);

  useEffect(() => {
    // Optional: if you want to show user's name from localStorage later
    // const stored = localStorage.getItem("userName");
    // if (stored) setUserName(stored);
  }, []);

  const showToast = (text, type = "info") => {
    setToast({ show: true, text, type });
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => {
      setToast({ show: false, text: "", type: "info" });
    }, 2400);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    showToast("Logged out successfully", "success");
    setTimeout(() => navigate("/user-login"), 500);
  };

  const handleQuickAction = (action) => {
    // Replace these routes with your real pages later
    if (action === "book") return navigate("/vets");
    if (action === "message") return showToast("Messaging module coming next ✨", "info");
    if (action === "video") return showToast("Video consultation module coming next 📹", "info");
    if (action === "history") return showToast("Medical history module coming next 📄", "info");
  };

  const handleCancelAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Cancelled" } : a))
    );
    showToast("Appointment cancelled", "success");
  };

  const handleReschedule = (id) => {
    showToast("Reschedule flow coming next 🗓️", "info");
    // Later: open modal + update in DB
  };

  const handleViewPet = (petId) => {
    showToast(`Pet details: ${petId} (page coming next)`, "info");
    // Later: navigate(`/pet/${petId}`)
  };

  return (
    <div style={styles.page}>
      {/* Top Bar */}
      <div style={styles.topbar}>
        <div style={styles.brand}>
          <div style={styles.brandDot} />
          <div>
            <div style={styles.brandTitle}>VetoCare</div>
            <div style={styles.brandSub}>User Dashboard</div>
          </div>
        </div>

        <div style={styles.topbarRight}>
          <div style={styles.userPill}>
            <span style={styles.userAvatar}>{(userName || "U").slice(0, 1).toUpperCase()}</span>
            <div style={{ lineHeight: 1.1 }}>
              <div style={styles.userName}>{userName}</div>
              <div style={styles.userRole}>Pet Owner</div>
            </div>
          </div>

          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={styles.container}>
        {/* Welcome Banner */}
        <div style={styles.welcomeCard}>
          <div>
            <div style={styles.welcomeHi}>Welcome back, {userName} 👋</div>
            <div style={styles.welcomeText}>
              Manage your pet’s health easily — book appointments, chat with vets, and track records.
            </div>

            <div style={styles.bannerBtns}>
              <button style={styles.primaryBtn} onClick={() => handleQuickAction("book")}>
                Book Appointment
              </button>
              <button style={styles.secondaryBtn} onClick={() => handleQuickAction("message")}>
                Message Vet
              </button>
            </div>
          </div>

          <div style={styles.statsWrap}>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Registered Pets</div>
              <div style={styles.statValue}>{stats.petsCount}</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Upcoming Appointments</div>
              <div style={styles.statValue}>{stats.upcomingCount}</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={styles.sectionHeaderRow}>
          <div style={styles.sectionTitle}>Quick Actions</div>
          <div style={styles.sectionHint}>Fast access to your main tasks</div>
        </div>

        <div style={styles.actionsGrid}>
          <ActionCard
            title="Book Appointment"
            desc="Schedule a consultation in minutes"
            icon="🩺"
            onClick={() => handleQuickAction("book")}
          />
          <ActionCard
            title="Message Vet"
            desc="Chat with your veterinarian"
            icon="💬"
            onClick={() => handleQuickAction("message")}
          />
          <ActionCard
            title="Video Call"
            desc="Start online consultation"
            icon="📹"
            onClick={() => handleQuickAction("video")}
          />
          <ActionCard
            title="Medical History"
            desc="View past visits and notes"
            icon="📄"
            onClick={() => handleQuickAction("history")}
          />
        </div>

        {/* Upcoming Appointments */}
        <div style={{ ...styles.sectionHeaderRow, marginTop: 22 }}>
          <div style={styles.sectionTitle}>Upcoming Appointments</div>
          <div style={styles.sectionHint}>Your scheduled consultations</div>
        </div>

        <div style={styles.tableCard}>
          {appointments.filter((a) => a.status !== "Cancelled").length === 0 ? (
            <EmptyState
              title="No upcoming appointments"
              subtitle="Book an appointment to consult with a vet."
              buttonText="Book Now"
              onClick={() => handleQuickAction("book")}
            />
          ) : (
            <>
              <div style={styles.tableHead}>
                <div style={{ ...styles.th, flex: 1.2 }}>Vet</div>
                <div style={{ ...styles.th, flex: 1.2 }}>Date</div>
                <div style={{ ...styles.th, flex: 0.9 }}>Time</div>
                <div style={{ ...styles.th, flex: 0.9 }}>Mode</div>
                <div style={{ ...styles.th, flex: 0.9 }}>Status</div>
                <div style={{ ...styles.th, flex: 1.1, textAlign: "right" }}>Actions</div>
              </div>

              {appointments.map((a) => (
                <div key={a.id} style={styles.tableRow}>
                  <div style={{ ...styles.td, flex: 1.2, fontWeight: 600 }}>{a.vetName}</div>
                  <div style={{ ...styles.td, flex: 1.2 }}>{a.date}</div>
                  <div style={{ ...styles.td, flex: 0.9 }}>{a.time}</div>
                  <div style={{ ...styles.td, flex: 0.9 }}>
                    <span style={badgeStyle(a.mode)}>{a.mode}</span>
                  </div>
                  <div style={{ ...styles.td, flex: 0.9 }}>
                    <span style={statusPillStyle(a.status)}>{a.status}</span>
                  </div>
                  <div style={{ ...styles.td, flex: 1.1, textAlign: "right" }}>
                    <button style={styles.smallBtn} onClick={() => handleReschedule(a.id)}>
                      Reschedule
                    </button>
                    <button
                      style={{ ...styles.smallBtn, ...styles.dangerBtn }}
                      onClick={() => handleCancelAppointment(a.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Pets */}
        <div style={{ ...styles.sectionHeaderRow, marginTop: 22 }}>
          <div style={styles.sectionTitle}>My Pets</div>
          <div style={styles.sectionHint}>Profiles and vaccination status</div>
        </div>

        <div style={styles.petsGrid}>
          {pets.map((p) => (
            <div key={p.id} style={styles.petCard}>
              <div style={styles.petTop}>
                <div style={styles.petIcon}>🐾</div>
                <div>
                  <div style={styles.petName}>{p.name}</div>
                  <div style={styles.petMeta}>{p.breed}</div>
                </div>
              </div>

              <div style={styles.petInfoRow}>
                <span style={styles.petLabel}>Age</span>
                <span style={styles.petValue}>{p.age}</span>
              </div>
              <div style={styles.petInfoRow}>
                <span style={styles.petLabel}>Vaccination</span>
                <span style={styles.petValue}>{p.vaccination}</span>
              </div>

              <button style={styles.petBtn} onClick={() => handleViewPet(p.id)}>
                View Details
              </button>
            </div>
          ))}
        </div>

        <div style={styles.footerNote}>
          Tip: Next we’ll connect this dashboard to real data (appointments, messages, pets) from MongoDB.
        </div>
      </div>

      {/* Toast */}
      {toast.show && (
        <div style={toastStyle(toast.type)}>
          <span style={{ fontWeight: 700, marginRight: 8 }}>•</span>
          {toast.text}
        </div>
      )}
    </div>
  );
};

/* -------------------- Small Components -------------------- */

const ActionCard = ({ icon, title, desc, onClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{ ...styles.actionCard, ...(hover ? styles.actionCardHover : {}) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div style={styles.actionIcon}>{icon}</div>
      <div style={styles.actionTitle}>{title}</div>
      <div style={styles.actionDesc}>{desc}</div>
      <div style={styles.actionLink}>Open →</div>
    </div>
  );
};

const EmptyState = ({ title, subtitle, buttonText, onClick }) => (
  <div style={styles.emptyWrap}>
    <div style={styles.emptyIcon}>📌</div>
    <div style={styles.emptyTitle}>{title}</div>
    <div style={styles.emptySubtitle}>{subtitle}</div>
    <button style={styles.primaryBtn} onClick={onClick}>
      {buttonText}
    </button>
  </div>
);

/* -------------------- Styles (CSS-in-JS) -------------------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #FFF7F2, #FFFFFF)",
    fontFamily: "Segoe UI, system-ui, -apple-system, Arial, sans-serif",
    color: "#1e293b",
  },

  topbar: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    padding: "14px 18px",
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  brand: { display: "flex", alignItems: "center", gap: 10 },
  brandDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    background: "linear-gradient(135deg, #FF7A59, #FFB703)",
    boxShadow: "0 8px 16px rgba(255,122,89,0.25)",
  },
  brandTitle: { fontSize: 14, fontWeight: 800, letterSpacing: 0.2 },
  brandSub: { fontSize: 12, opacity: 0.7, marginTop: 2 },

  topbarRight: { display: "flex", alignItems: "center", gap: 12 },

  userPill: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 10px",
    borderRadius: 14,
    background: "rgba(255,255,255,0.9)",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },

  userAvatar: {
    width: 34,
    height: 34,
    borderRadius: 12,
    display: "grid",
    placeItems: "center",
    background: "linear-gradient(135deg, #FF7A59, #FFB703)",
    color: "white",
    fontWeight: 800,
  },
  userName: { fontSize: 13, fontWeight: 800 },
  userRole: { fontSize: 11, opacity: 0.7 },

  logoutBtn: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.08)",
    background: "white",
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },

  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "18px 18px 50px",
  },

  welcomeCard: {
    marginTop: 16,
    display: "flex",
    gap: 14,
    alignItems: "stretch",
    justifyContent: "space-between",
    padding: 18,
    borderRadius: 20,
    background: "linear-gradient(135deg, rgba(255,122,89,0.12), rgba(255,183,3,0.10))",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 25px 60px rgba(0,0,0,0.08)",
    flexWrap: "wrap",
  },

  welcomeHi: { fontSize: 22, fontWeight: 900, marginBottom: 6 },
  welcomeText: { fontSize: 13.5, opacity: 0.85, maxWidth: 560, lineHeight: 1.5 },

  bannerBtns: { display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" },

  primaryBtn: {
    padding: "12px 14px",
    borderRadius: 14,
    border: "none",
    cursor: "pointer",
    fontWeight: 800,
    color: "white",
    background: "linear-gradient(135deg, #FF7A59, #FF5C35)",
    boxShadow: "0 18px 35px rgba(255,92,53,0.25)",
  },

  secondaryBtn: {
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid rgba(0,0,0,0.08)",
    cursor: "pointer",
    fontWeight: 800,
    background: "rgba(255,255,255,0.9)",
  },

  statsWrap: {
    display: "flex",
    gap: 12,
    minWidth: 260,
    justifyContent: "flex-end",
    flex: "1 1 auto",
  },

  statCard: {
    flex: 1,
    padding: 14,
    borderRadius: 18,
    background: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 18px 40px rgba(0,0,0,0.06)",
    minWidth: 150,
  },
  statLabel: { fontSize: 12, opacity: 0.75, fontWeight: 700 },
  statValue: { fontSize: 22, fontWeight: 900, marginTop: 6 },

  sectionHeaderRow: {
    marginTop: 18,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 10,
    flexWrap: "wrap",
  },
  sectionTitle: { fontSize: 16, fontWeight: 900 },
  sectionHint: { fontSize: 12, opacity: 0.7 },

  actionsGrid: {
    marginTop: 12,
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(180px, 1fr))",
    gap: 12,
  },

  actionCard: {
    borderRadius: 18,
    padding: 14,
    background: "rgba(255,255,255,0.95)",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 18px 45px rgba(0,0,0,0.06)",
    cursor: "pointer",
    transition: "transform 160ms ease, box-shadow 160ms ease",
    userSelect: "none",
  },
  actionCardHover: {
    transform: "translateY(-3px)",
    boxShadow: "0 28px 70px rgba(0,0,0,0.10)",
  },
  actionIcon: { fontSize: 22, marginBottom: 10 },
  actionTitle: { fontSize: 14, fontWeight: 900, marginBottom: 4 },
  actionDesc: { fontSize: 12.5, opacity: 0.75, lineHeight: 1.4 },
  actionLink: { marginTop: 10, fontSize: 12.5, fontWeight: 900, color: "#FF5C35" },

  tableCard: {
    marginTop: 12,
    borderRadius: 20,
    background: "rgba(255,255,255,0.95)",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 18px 45px rgba(0,0,0,0.06)",
    overflow: "hidden",
  },

  tableHead: {
    display: "flex",
    gap: 10,
    padding: "12px 14px",
    background: "rgba(0,0,0,0.02)",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
    alignItems: "center",
  },
  th: { fontSize: 12, opacity: 0.75, fontWeight: 900 },

  tableRow: {
    display: "flex",
    gap: 10,
    padding: "12px 14px",
    alignItems: "center",
    borderBottom: "1px solid rgba(0,0,0,0.05)",
    flexWrap: "wrap",
  },
  td: { fontSize: 13, opacity: 0.92 },

  smallBtn: {
    padding: "8px 10px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.08)",
    background: "white",
    cursor: "pointer",
    fontWeight: 800,
    marginLeft: 8,
  },
  dangerBtn: {
    borderColor: "rgba(255, 92, 53, 0.35)",
    color: "#FF5C35",
  },

  emptyWrap: {
    padding: 24,
    textAlign: "center",
  },
  emptyIcon: { fontSize: 28, marginBottom: 8 },
  emptyTitle: { fontSize: 16, fontWeight: 900 },
  emptySubtitle: { fontSize: 12.5, opacity: 0.75, margin: "6px 0 14px" },

  petsGrid: {
    marginTop: 12,
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(220px, 1fr))",
    gap: 12,
  },

  petCard: {
    borderRadius: 20,
    background: "rgba(255,255,255,0.95)",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 18px 45px rgba(0,0,0,0.06)",
    padding: 14,
  },
  petTop: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 },
  petIcon: {
    width: 40,
    height: 40,
    borderRadius: 16,
    display: "grid",
    placeItems: "center",
    background: "linear-gradient(135deg, rgba(255,122,89,0.14), rgba(255,183,3,0.12))",
    border: "1px solid rgba(0,0,0,0.06)",
  },
  petName: { fontSize: 14, fontWeight: 900 },
  petMeta: { fontSize: 12, opacity: 0.7, marginTop: 2 },

  petInfoRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12.5,
    padding: "8px 0",
    borderTop: "1px dashed rgba(0,0,0,0.10)",
  },
  petLabel: { opacity: 0.7, fontWeight: 800 },
  petValue: { fontWeight: 800 },

  petBtn: {
    marginTop: 10,
    width: "100%",
    padding: "10px 12px",
    borderRadius: 14,
    border: "none",
    cursor: "pointer",
    fontWeight: 900,
    color: "white",
    background: "linear-gradient(135deg, #FF7A59, #FF5C35)",
    boxShadow: "0 18px 35px rgba(255,92,53,0.18)",
  },

  footerNote: {
    marginTop: 18,
    fontSize: 12,
    opacity: 0.7,
    textAlign: "center",
  },
};

// Badge styles
const badgeStyle = (mode) => {
  const base = {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 900,
    border: "1px solid rgba(0,0,0,0.08)",
    background: "rgba(255,255,255,0.9)",
  };

  if (String(mode).toLowerCase() === "online") {
    return { ...base, color: "#0f766e" };
  }
  return { ...base, color: "#1d4ed8" };
};

const statusPillStyle = (status) => {
  const s = String(status || "").toLowerCase();
  const base = {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 900,
    border: "1px solid rgba(0,0,0,0.08)",
  };

  if (s.includes("confirm")) return { ...base, background: "rgba(16, 185, 129, 0.12)", color: "#065f46" };
  if (s.includes("pending")) return { ...base, background: "rgba(245, 158, 11, 0.14)", color: "#92400e" };
  if (s.includes("cancel")) return { ...base, background: "rgba(255, 92, 53, 0.12)", color: "#9a3412" };
  return { ...base, background: "rgba(148, 163, 184, 0.18)", color: "#334155" };
};

const toastStyle = (type) => {
  const base = {
    position: "fixed",
    right: 18,
    bottom: 18,
    padding: "12px 14px",
    borderRadius: 14,
    background: "rgba(255,255,255,0.95)",
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 22px 60px rgba(0,0,0,0.16)",
    fontWeight: 800,
    fontSize: 13,
    maxWidth: 360,
  };

  if (type === "success") return { ...base, borderColor: "rgba(16,185,129,0.35)" };
  if (type === "error") return { ...base, borderColor: "rgba(255,92,53,0.45)" };
  return base;
};

/* -------------------- Responsive tweaks -------------------- */
/**
 * Note: CSS-in-JS can’t use media queries easily without extra setup.
 * But your layout still wraps nicely because we used responsive grids with minmax.
 * If you want, I can convert this into normal CSS inside the same file using a <style> tag approach.
 */

export default UserDashboard;