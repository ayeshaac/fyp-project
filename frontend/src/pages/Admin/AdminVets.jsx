import { useEffect, useState } from "react";
import {
  fetchPendingVets,
  approveVet,
  rejectVet
} from "./adminVetService";

const AdminVets = () => {
  const [vets, setVets] = useState([]);

  useEffect(() => {
    const loadVets = async () => {
      try {
        const data = await fetchPendingVets();
        setVets(data);
      } catch (error) {
        console.error("Error loading pending vets:", error);
      }
    };

    loadVets();
  }, []);

  const handleApprove = async (id) => {
    await approveVet(id);
    const data = await fetchPendingVets();
    setVets(data);
  };

  const handleReject = async (id) => {
    await rejectVet(id);
    const data = await fetchPendingVets();
    setVets(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Pending Vet Applications</h2>

      {vets.length === 0 && <p>No pending vets</p>}

      {vets.map((vet) => (
        <div
          key={vet._id}
          style={{
            border: "1px solid #ccc",
            padding: 12,
            marginBottom: 12,
            borderRadius: 6
          }}
        >
          <h4>{vet.name}</h4>
          <p>Email: {vet.email || "N/A"}</p>
          <p>Phone: {vet.phone || "N/A"}</p>
          <p>City: {vet.city || "N/A"}</p>
          <p>Specialization: {vet.specialization || "N/A"}</p>

          <button onClick={() => handleApprove(vet._id)}>
            Approve
          </button>
          <button
            onClick={() => handleReject(vet._id)}
            style={{ marginLeft: 10 }}
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminVets;
