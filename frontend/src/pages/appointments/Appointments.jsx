import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Appointments({ appointments, setAppointments }) {
 const navigate = useNavigate();

  const updateStatus = async (id, status) => {
  const token = localStorage.getItem("token");

  try {
    await axios.put(
      `http://localhost:5000/api/appointments/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // UI update (without refresh)
    setAppointments(prev =>
      prev.map(app =>
        app._id === id ? { ...app, status } : app
      )
    );

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Appointments</h2>

<div style={styles.statsRow}>

 <div
  style={styles.statCard}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
  }}
>
    <p>Total</p>
    <h2>{appointments.length}</h2>
  </div>

  <div
  style={styles.statCard}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
  }}
>
    <p>Pending</p>
    <h2>
      {appointments.filter(a => a.status === "pending").length}
    </h2>
  </div>

  <div
  style={styles.statCard}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
  }}
>
    <p>Approved</p>
    <h2>
      {appointments.filter(a => a.status === "approved").length}
    </h2>
  </div>

 <div
  style={styles.statCard}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
  }}
>
    <p>Rejected</p>
    <h2>
      {appointments.filter(a => a.status === "rejected").length}
    </h2>
  </div>

</div>
     
<h3 style={{ marginBottom: "10px" }}>Pending Appointments</h3>
<div style={styles.cardGrid}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
  }}
>
 {appointments
        .filter(a => a.status === "pending").length === 0 ? (
  <p style={styles.emptyText}>No pending appointments</p>
) : (
  appointments
    .filter(a => a.status === "pending")
    .map((app) => (
    <div
  key={app._id}
  style={styles.card}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-6px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
  }}
>

        <span style={{
          ...styles.badge,
          background: "#fde68a"
        }}>
          {app.status}
        </span>

        <div style={styles.cardTop}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
            style={styles.avatar}
          />

          <div>
            <h4>{app.petId?.name}</h4>
            <p style={styles.subText}>{app.petId?.type}</p>
          </div>
        </div>

        <div style={styles.infoRow}>
          <div>
            <p style={styles.label}>Owner</p>
            <p>{app.userId?.name}</p>
          </div>

          <div>
            <p style={styles.label}>Time</p>
            <p>{app.time}</p>
          </div>
          <div>
  <p style={styles.label}>Date</p>
  <p>{app.date}</p>
</div>
        </div>

        <div style={styles.btnRow}>
          <button
            style={styles.approveBtn}
            onClick={() => updateStatus(app._id, "approved")}
          >
            Approve
          </button>

          <button
            style={styles.rejectBtn}
            onClick={() => updateStatus(app._id, "rejected")}
          >
            Reject
          </button>
        </div>

      </div>
   ))
)}
</div>
<h3 style={{ margin: "30px 0 10px" }}>Approved Appointments</h3>

<div style={styles.cardGrid}>
  {appointments.filter(a => a.status === "approved").length === 0 ? (
  <p style={styles.emptyText}>No approved appointments</p>
) : (
  appointments
    .filter(a => a.status === "approved")
    .map((app) => (
      <div
  key={app._id}
  style={styles.card}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-6px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
  }}
>

        <span style={{
          ...styles.badge,
          background: "#bbf7d0"
        }}>
          {app.status}
        </span>

        <div style={styles.cardTop}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
            style={styles.avatar}
          />

          <div>
            <h4>{app.petId?.name}</h4>
            <p style={styles.subText}>{app.petId?.type}</p>
          </div>
        </div>

        <div style={styles.infoRow}>
          <div>
            <p style={styles.label}>Owner</p>
            <p>{app.userId?.name}</p>
          </div>

          <div>
            <p style={styles.label}>Time</p>
            <p>{app.time}</p>
          </div>
          <div>
  <p style={styles.label}>Date</p>
  <p>{app.date}</p>
</div>
        </div>
{/* 🔥 CHAT BUTTON YAHAN */}
<button
  style={styles.chatBtn}
  onClick={() => navigate(`/chat/${app._id}`)}
>
  Chat 💬
</button>
      </div>
  ))
)}
</div>
<h3 style={{ margin: "30px 0 10px" }}>Rejected Appointments</h3>

<div style={styles.cardGrid}>
  {appointments.filter(a => a.status === "rejected").length === 0 ? (
  <p style={styles.emptyText}>No rejected appointments</p>
) : (
  appointments
    .filter(a => a.status === "rejected")
    .map((app) => (
      <div
  key={app._id}
  style={styles.card}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-6px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
  }}
>

        <span style={{
          ...styles.badge,
          background: "#fecaca"
        }}>
          {app.status}
        </span>

        <div style={styles.cardTop}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
            style={styles.avatar}
          />

          <div>
            <h4>{app.petId?.name}</h4>
            <p style={styles.subText}>{app.petId?.type}</p>
          </div>
        </div>

        <div style={styles.infoRow}>
  <div>
    <p style={styles.label}>Owner</p>
    <p>{app.userId?.name}</p>
  </div>

  <div>
    <p style={styles.label}>Date</p>
    <p>{app.date}</p>
  </div>

  <div>
    <p style={styles.label}>Time</p>
    <p>{app.time}</p>
  </div>
</div>

      </div>
      ))
)}
</div>
    </div>
  );
}

const styles = {
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
  },

card: {
  background: "white",
  padding: "20px",
  borderRadius: "20px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  position: "relative",
  transition: "0.3s ease",
},

  badge: {
    position: "absolute",
    top: "15px",
    right: "15px",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  cardTop: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },

  avatar: {
    width: "40px",
    height: "40px",
  },

  subText: {
    color: "#6b7280",
    margin: 0,
  },

 infoRow: {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
},

  label: {
    fontSize: "12px",
    color: "#9ca3af",
  },
  statsRow: {
  display: "flex",
  gap: "20px",
  marginBottom: "30px",
},
emptyText: {
  color: "#6b7280",
  fontSize: "14px",
  textAlign: "center",
  marginTop: "10px",
},

statCard: {
  flex: 1,
  background: "white",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0 15px 30px rgba(0,0,0,0.06)",
  textAlign: "center",
  transition: "0.3s",
},
  container: {
  padding: "20px",
},

title: {
  marginBottom: "20px",
},

grid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "20px",
},
btnRow: {
  marginTop: "15px",
  display: "flex",
  gap: "10px",
},
chatBtn: {
  marginTop: "10px",
  width: "100%",
  padding: "8px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
},
approveBtn: {
  flex: 1,
  padding: "8px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
},

rejectBtn: {
  flex: 1,
  padding: "8px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
},
};