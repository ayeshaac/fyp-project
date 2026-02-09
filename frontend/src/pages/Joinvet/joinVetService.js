import axios from "axios";

export const registerVet = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/vets",
      data
    );

    alert("Application submitted successfully");
    return response.data;

  } catch (err) {
    console.error("AXIOS ERROR 👉", err);   // 👈 ADD THIS
    alert("Error submitting form");
  }
};
