import axios from "axios";

// 🔹 Backend base URL
const API = "http://localhost:5000/api/vets";

// ✅ GET: all pending vets (Admin panel)
export const fetchPendingVets = async () => {
  const res = await axios.get(`${API}/pending`);
  return res.data;
};

// ✅ PUT: approve a vet
export const approveVet = async (id) => {
  const res = await axios.put(`${API}/${id}/approve`);
  return res.data;
};

// ✅ PUT: reject a vet
export const rejectVet = async (id) => {
  const res = await axios.put(`${API}/${id}/reject`);
  return res.data;
};
