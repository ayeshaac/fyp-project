import { useEffect, useState } from "react";
import { fetchVets } from "./vetService";
import "./Vets.css";

const Vets = () => {
  const [vets, setVets] = useState([]);
  const [specialization, setSpecialization] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const loadVets = async () => {
      try {
        const data = await fetchVets({
          specialization,
          city,
        });
        setVets(data);
      } catch (error) {
        console.error("Error loading vets:", error);
      }
    };

    loadVets();
  }, [specialization, city]);

  return (
    <div className="vets-page">
      <h2 className="title">Find a Veterinarian</h2>

      {/* 🔍 Filters */}
      <div className="filters">
        <select onChange={(e) => setSpecialization(e.target.value)}>
          <option value="">All Categories</option>
          <option value="skin">Skin / Allergy</option>
          <option value="surgery">Surgery</option>
          <option value="dental">Dental</option>
          <option value="eye">Eye</option>
        </select>

        <input
          type="text"
          placeholder="Enter city"
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      {/* 👩‍⚕️ Vet Cards */}
      <div className="vet-grid">
        {vets.length === 0 && <p>No approved vets found</p>}

        {vets.map((vet) => (
          <div className="vet-card" key={vet._id}>
            <h3>{vet.name}</h3>
            <p>
              <strong>Specialization:</strong> {vet.specialization}
            </p>
            <p>
              <strong>City:</strong> {vet.city}
            </p>
            <p>
              <strong>Experience:</strong> {vet.experience} years
            </p>
            <p>
              <strong>Phone:</strong> {vet.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vets;
