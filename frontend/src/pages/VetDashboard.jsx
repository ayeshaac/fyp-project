import { useEffect, useState } from "react";
import axios from "axios";

export default function VetDashboard() {
  const [vet, setVet] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first");
      return;
    }

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
  }, []);

  if (error) return <h3 style={{ padding: 30 }}>{error}</h3>;
  if (!vet) return <h3 style={{ padding: 30 }}>Loading dashboard...</h3>;

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={{ marginBottom: 30 }}>VetCare</h2>
        <p style={styles.menuItem}>Dashboard</p>
        <p style={styles.menuItem}>Appointments</p>
        <p style={styles.menuItem}>Patients</p>
        <p style={styles.menuItem}>Profile</p>
      </div>

      <div style={styles.main}>
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