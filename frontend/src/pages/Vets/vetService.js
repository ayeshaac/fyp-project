import axios from "axios";

const API = "http://localhost:5000/api/vets";

export const fetchVets = async (filters) => {
  const res = await axios.get(API, { params: filters });
  return res.data;
};
