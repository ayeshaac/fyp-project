import React, { useState } from "react";

export default function SurgeryForm() {
  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    city: "",
    surgery: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Yahan API call kar sakte ho (axios/fetch)
    console.log("Request Booking:", form);

    alert("Request submitted! (Demo)");
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Plan your Pet Surgery</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Pet/Patient Name*</label>
        <input
          style={styles.input}
          name="patientName"
          value={form.patientName}
          onChange={handleChange}
          placeholder="Enter pet category"
          required
        />

        <label style={styles.label}>Phone No*</label>
        <input
          style={styles.input}
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter phone no"
          required
        />

        <label style={styles.label}>City*</label>
        <select
          style={styles.input}
          name="city"
          value={form.city}
          onChange={handleChange}
          required
        >
          <option value="">Select City</option>
          <option value="Karachi">Karachi</option>
          <option value="Lahore">Lahore</option>
          <option value="Islamabad">Islamabad</option>
        </select>

        <label style={styles.label}>Surgery*</label>
        <select
          style={styles.input}
          name="surgery"
          value={form.surgery}
          onChange={handleChange}
          required
        >
          <option value="">Select Surgery</option>
          <option value="Spay/Neuter">Spay / Neuter</option>
          <option value="Dental Surgery">Dental Surgery</option>
          <option value="Tumor Removal">Tumor Removal</option>
          <option value="Orthopedic">Orthopedic</option>
        </select>

        <button type="submit" style={styles.btn}>
          Request Surgery Booking
        </button>
      </form>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: 18,
    boxShadow: "0 6px 18px rgba(17,24,39,0.06)",
  },
  title: { margin: "0 0 14px 0", fontSize: 18, color: "#0b2a6f" },
  form: { display: "grid", gap: 10 },
  label: { fontSize: 13, fontWeight: 600 },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    outline: "none",
  },
  btn: {
    marginTop: 6,
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: "none",
    background: "#0b2a6f",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
};
