import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaPaw, FaEye, FaEyeSlash } from "react-icons/fa";

export default function VetLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/vets/login",
        formData
      );

      // Save token properly
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "doctor");
      localStorage.setItem("vet", JSON.stringify(res.data.vet));

      // Go to dashboard (NO reload)
      navigate("/vet-dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <FaUserMd size={35} color="#2E8B57" />
          <h2 style={{ margin: "10px 0 5px" }}>Doctor Login</h2>
          <p style={{ color: "#777", fontSize: 14 }}>
            Veterinary Secure Portal <FaPaw />
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: 25 }}>
          <div style={styles.inputWrapper}>
            <input
              type="email"
              name="email"
              placeholder="Doctor Email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <span
              style={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>

        <p style={styles.footer}>© 2026 VetCare Management System</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1f4037, #99f2c8)",
    fontFamily: "Segoe UI, sans-serif",
  },
  card: {
    width: "400px",
    padding: "40px 35px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
    textAlign: "center",
  },
  header: { marginBottom: 10 },
  inputWrapper: {
    position: "relative",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px 40px 12px 15px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
  },
  eyeIcon: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#555",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #2E8B57, #3CB371)",
    color: "#fff",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
  },
  footer: {
    marginTop: "25px",
    fontSize: "12px",
    color: "#999",
  },
};