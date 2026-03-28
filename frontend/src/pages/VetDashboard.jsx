import { useEffect, useState } from "react";
import axios from "axios";

export default function VetDashboard() {
  const [vet, setVet] = useState(null);
  const [error, setError] = useState("");
const [activeTab, setActiveTab] = useState("dashboard");  
const [appointments, setAppointments] = useState([]);

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    setError("Please login first");
    return;
  }

  // 👉 Vet fetch
  axios
    .get("http://localhost:5000/api/vets/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setVet(res.data);
    })
    .catch(() => {
      setError("Unauthorized. Please login again.");
    });

  // 👇 YAHAN ADD KARNA HAI (SECOND API CALL)
  axios
    .get("http://localhost:5000/api/appointments/vet", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setAppointments(res.data);
    })
    .catch((err) => console.log(err));

}, []);

  if (error) return <h3 style={{ padding: 30 }}>{error}</h3>;
  if (!vet) return <h3 style={{ padding: 30 }}>Loading dashboard...</h3>;

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={{ marginBottom: 30 }}>VetCare</h2>
        <p style={styles.menuItem} onClick={() => setActiveTab("dashboard")}>
  Dashboard
</p>

<p style={styles.menuItem} onClick={() => setActiveTab("appointments")}>
  Appointments
</p>

<p style={styles.menuItem}>Patients</p>
<p style={styles.menuItem}>Profile</p>
      </div>
<div style={styles.main}>

  {activeTab === "dashboard" && (
    <>
      <h1>Welcome Dr. {vet.name}</h1>

      <div style={styles.cardRow}>
        <div style={styles.card}>
          <h4>Status</h4>
          <h2>{vet.status}</h2>
        </div>

        <div style={styles.card}>
          <h4>Experience</h4>
          <h2>{vet.experience} Years</h2>
        </div>

        <div style={styles.card}>
          <h4>City</h4>
          <h2>{vet.city}</h2>
        </div>
      </div>

      <div style={styles.profileCard}>
        <h3>Profile Information</h3>
        <p><strong>Email:</strong> {vet.email}</p>
        <p><strong>Phone:</strong> {vet.phone}</p>
        <p><strong>Specialization:</strong> {vet.specialization}</p>
        <p><strong>Description:</strong> {vet.description || "N/A"}</p>
      </div>
    </>
  )}

  {activeTab === "appointments" && (
  <>
    <h2>Appointments</h2>

    {appointments.length === 0 ? (
      <p>No appointments found</p>
    ) : (
      appointments.map((app) => (
        <div key={app._id} style={styles.card}>
          <h4>Pet: {app.petId?.name}</h4>
          <p>Date: {app.date}</p>
          <p>Time: {app.time}</p>
          <p>Status: {app.status}</p>
        </div>
      ))
    )}
  </>
)}

</div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#f4f6f9",
    fontFamily: "Segoe UI, sans-serif",
  },
  sidebar: {
    width: "240px",
    background: "#111827",
    color: "white",
    padding: "30px 20px",
  },
  menuItem: {
    marginBottom: 15,
    cursor: "pointer",
    opacity: 0.8,
  },
  main: {
    flex: 1,
    padding: "40px",
  },
  cardRow: {
    display: "flex",
    gap: "20px",
    marginTop: "30px",
  },
  card: {
    flex: 1,
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },
  profileCard: {
    background: "white",
    marginTop: "40px",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },
};