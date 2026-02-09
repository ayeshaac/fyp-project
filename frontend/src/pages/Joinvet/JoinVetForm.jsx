import { useState } from "react";
import { registerVet } from "./joinVetService";

const JoinVetForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    city: ""
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
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <input
        name="specialization"
        placeholder="Specialization"
        value={formData.specialization}
        onChange={handleChange}
      />

      <input
        name="experience"
        placeholder="Experience (years)"
        value={formData.experience}
        onChange={handleChange}
      />

      <input
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />

      <button type="submit">Apply</button>
    </form>
  );
};

export default JoinVetForm;
