import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerVet } from "./joinVetService";
import { FaUserMd, FaEye, FaEyeSlash } from "react-icons/fa";

const JoinVetForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    specialization: "",
    experience: "",
    city: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerVet(formData);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <FaUserMd size={35} color="#2E8B57" />
          <h2>Join as Veterinary Doctor</h2>
          <p>Create your professional profile</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} style={styles.input} />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} style={styles.input} />

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
            <span style={styles.eye} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} style={styles.input} />
          <input name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} style={styles.input} />
          <input name="experience" placeholder="Experience (Years)" value={formData.experience} onChange={handleChange} style={styles.input} />
          <input name="city" placeholder="City" value={formData.city} onChange={handleChange} style={styles.input} />

          <textarea
            name="description"
            placeholder="Write about yourself..."
            value={formData.description}
            onChange={handleChange}
            style={styles.textarea}
          />

          <button type="submit" style={styles.button}>
            Apply Now
          </button>

          <p style={styles.loginText}>
            Already have an account?{" "}
            <span style={styles.loginLink} onClick={() => navigate("/vet-login")}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1f4037, #99f2c8)",
    fontFamily: "Segoe UI, sans-serif",
    padding: "30px"
  },

  card: {
    width: "100%",
    maxWidth: "700px",
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 25px 60px rgba(0,0,0,0.25)"
  },

  header: {
    textAlign: "center",
    marginBottom: "25px"
  },

  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px"
  },

  input: {
    padding: "12px 15px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    transition: "0.3s"
  },

  textarea: {
    gridColumn: "span 2",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    minHeight: "90px",
    resize: "none"
  },

  eye: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#555"
  },

  button: {
    gridColumn: "span 2",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #2E8B57, #3CB371)",
    color: "#fff",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
  },

  loginText: {
    gridColumn: "span 2",
    textAlign: "center",
    marginTop: "15px"
  },

  loginLink: {
    color: "#2E8B57",
    fontWeight: "600",
    cursor: "pointer"
  }
};

export default JoinVetForm;