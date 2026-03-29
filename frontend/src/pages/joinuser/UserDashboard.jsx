
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const UserDashboard = () => {


  const [showModal, setShowModal] = useState(false);
  const [pets, setPets] = useState([]);
  const [user, setUser] = useState(null);
  const [editingPet, setEditingPet] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [vets, setVets] = useState([]);
const [appointments, setAppointments] = useState([]);

const fetchAppointments = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/appointments/my",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAppointments(res.data);

  } catch (err) {
    console.log(err);
  }
};

const [appointmentData, setAppointmentData] = useState({
  petId: "",
  vetId: "",
  date: "",
  time: ""
});
const [formData, setFormData] = useState({
  name: "",
  type: "",
  breed: "",
  age: "",
  gender: "",
  weight: "",
});
const fetchBookingData = async () => {
  try {
    const token = localStorage.getItem("token");

    // 🔹 GET PETS
    const petsRes = await axios.get(
      "http://localhost:5000/api/pets/my",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    // 🔹 GET VETS
    const vetsRes = await axios.get(
      "http://localhost:5000/api/vets"
    );

    // 🔥 IMPORTANT (MISSING PART)
    setPets(petsRes.data);
    setVets(vetsRes.data);

  } catch (err) {
    console.log(err);
  }
};
const handleBookAppointment = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/appointments",
      appointmentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Appointment booked successfully ✅");

    setShowBooking(false);

    setAppointmentData({
      petId: "",
      vetId: "",
      date: "",
      time: "",
    });

  } catch (err) {
    console.log(err.response?.data || err.message);
    alert(err.response?.data?.message || "Error booking appointment");
  }
};
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleAddPet = async () => {
  try {
    if (editingPet) {
  // 🔥 UPDATE (jab edit mode ho)
  await axios.put(
    `http://localhost:5000/api/pets/${editingPet._id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
} else {
  // ➕ ADD (normal case)
  await axios.post(
    "http://localhost:5000/api/pets",
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  
}

    // ✅ sab yahan hona chahiye
    setShowModal(false);

   
setEditingPet(null);
    fetchPets(); // 🔥 IMPORTANT

    console.log("Pet Added");

  } catch (err) {
    console.log(err);
  }
};
const handleDelete = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/pets/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    fetchPets(); // refresh UI
  } catch (err) {
    console.log(err);
  }
};
const handleEdit = (pet) => {
 setFormData({
  name: pet.name || "",
  type: pet.type || "",
  breed: pet.breed || "",
  age: pet.age || "",
  gender: pet.gender || "",
  weight: pet.weight || "",
});

  setEditingPet(pet); // 🔥 important
  setShowModal(true);
};
const fetchPets = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/pets/my",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setPets(res.data);
  } catch (err) {
    console.log(err.response?.data || err.message);
alert(err.response?.data?.message || "Error");
  }
};
const fetchUser = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/users/me",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setUser(res.data);
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  fetchPets();
  fetchUser();
  fetchAppointments();

}, []);

  // PET CARD COMPONENT
 const PetCard = ({ pet }) => {
  if (!pet) return null;

  return (
    <div style={styles.petCard}>
      <img src="https://placedog.net/200" style={styles.petImg} />

      <h3>{pet.name}</h3>
      <p>{pet.type} | {pet.breed}</p>
<p>Age: {pet.age}</p>
<p>Gender: {pet.gender}</p>
<p>Weight: {pet.weight}</p>

     <div style={styles.cardBtns}>
  <button
    style={styles.deleteBtn}
    onClick={() => handleDelete(pet._id)}
  >
    Delete
  </button>

  <button
    style={styles.editBtn}
    onClick={() => handleEdit(pet)}
  >
    Edit
  </button>
</div>
    </div>
  );
};

  // QUICK ACTION CARD
const ActionCard = ({ title, desc, onClick }) => (
  <div style={styles.actionCard} onClick={onClick}>
    <h4>{title}</h4>
    <p style={styles.gray}>{desc}</p>
    <span style={styles.open}>Open →</span>
  </div>
);
  return (
    <div style={styles.wrapper}>

      {/* LEFT SIDE */}
      <div style={styles.left}>

       

        {/* WELCOME CARD */}
        <div style={styles.card}>
          <div style={{ flex: 1 }}>
           <h2>
  Welcome back, {user?.name || "User"} 👋
</h2>
            <p style={styles.gray}>
              Manage your pet’s health easily—book appointments, chat with vets.
            </p>

            <div style={{ marginTop: "15px" }}>
              <button
  style={styles.primary}
  onClick={() => {
    setShowBooking(true);
    fetchBookingData();
  }}
>
  Book Appointment
</button>
              <button style={styles.secondary}>Message Vet</button>
            </div>
          </div>

          <div style={styles.stats}>
            <div style={styles.statBox}>
              <h2>{pets.length}</h2>
              <p>Pets</p>
            </div>

            <div style={styles.statBox}>
  <h2>0</h2>
  <p>Upcoming</p>
</div>
          </div>
        </div>

        {/* ADD PET */}
     <h3 style={styles.title}>Add New Pet 🐾</h3>

<div style={styles.cardColumn}>
  <p style={styles.gray}>
    Add your pet details to manage medical history, appointments and care.
  </p>

  <button
    style={styles.primary}
    onClick={() => {
  setEditingPet(null);
  setFormData({
    name: "",
    type: "",
    breed: "",
    age: "",
    gender: "",
    weight: "",
  });
  setShowModal(true);
}}
  >
    + Add New Pet
  </button>
</div>

        {/* PET LIST */}
        <h3 style={styles.title}>My Pets</h3>

      <div style={styles.petList}>
  {pets.map((pet) => (
    <PetCard key={pet._id} pet={pet} />
  ))}
</div>
        {/* APPOINTMENT */}
        <h3 style={styles.title}>Upcoming Appointments</h3>

       {appointments.map((app) => (
  <div key={app._id} style={styles.card}>

    <img
      src="https://randomuser.me/api/portraits/men/32.jpg"
      style={styles.docImg}
    />

    <div style={{ flex: 1 }}>
      <h4>{app.vetId?.name || "Vet"}</h4>
      <p style={styles.gray}>
        {app.date} | {app.time}
      </p>
    </div>

    <button style={styles.primary}>
      {app.status}
    </button>
{app.status === "approved" && (
  <button style={styles.chatBtn}>
    Chat 💬
  </button>
)}
  </div>
))}

      </div>

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        <h3>Quick Actions</h3>

      <ActionCard
  title="Book Appointment"
  desc="Schedule consultation"
  onClick={() => {
    setShowBooking(true);
    fetchBookingData();
  }}
/>

        <ActionCard
          title="Message Vet"
          desc="Chat with your doctor"
        />

        <ActionCard
          title="Video Call"
          desc="Online consultation"
        />

        <ActionCard
          title="Medical History"
          desc="View reports"
        />
      </div>
{showModal && (
  <div style={styles.modalOverlay}>
    <div style={styles.modal}>

      <h2>{editingPet ? "Edit Pet" : "Add New Pet"}</h2>
<input
  style={styles.input}
  name="name"
  placeholder="Pet Name"
  value={formData.name}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="type"
  placeholder="Animal Type"
  value={formData.type}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="breed"
  placeholder="Breed"
  value={formData.breed}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="age"
  placeholder="Age (years)"
  value={formData.age}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="gender"
  placeholder="Gender"
  value={formData.gender}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="weight"
  placeholder="Weight (kg)"
  value={formData.weight}
  onChange={handleChange}
/>
      <div style={{
    marginTop: "15px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  }}>
        <button
          style={styles.outlineBtn}
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>

        <button style={styles.primary} onClick={handleAddPet}>
  Save
</button>


      </div>

    </div>
  </div>
)}
{showBooking && (
  <div style={styles.modalOverlay}>
    <div style={styles.modal}>
      <h2>Book Appointment</h2>
<select
  value={appointmentData.petId}
  onChange={(e) =>
    setAppointmentData({
      ...appointmentData,
      petId: e.target.value
    })
  }
>
        <option>Select Pet</option>
        {pets.map((pet) => (
          <option key={pet._id} value={pet._id}>
            {pet.name || "Pet"}
          </option>
        ))}
      </select>

      <select
  value={appointmentData.vetId}
  onChange={(e) =>
    setAppointmentData({
      ...appointmentData,
      vetId: e.target.value
    })
  }
>
        <option>Select Vet</option>
        {vets.map((vet) => (
          <option key={vet._id} value={vet._id}>
            {vet.name}
          </option>
        ))}
      </select>

    <input
  type="date"
  value={appointmentData.date}
  onChange={(e) =>
    setAppointmentData({
      ...appointmentData,
      date: e.target.value
    })
  }
/>

     <input
  type="time"
  value={appointmentData.time}
  onChange={(e) =>
    setAppointmentData({
      ...appointmentData,
      time: e.target.value
    })
  }
/>

      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
        <button onClick={() => setShowBooking(false)}>
          Cancel
        </button>

        <button onClick={handleBookAppointment}>
          Confirm
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default UserDashboard;



// ================= STYLES =================
const styles = {
cardColumn: {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  marginBottom: "20px",

  display: "flex",
  flexDirection: "column",
  gap: "10px",

  width: "400px",        // 🔥 width control
   
},
cardBtns: {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  marginTop: "10px",
},

editBtn: {
  padding: "8px 14px",
  borderRadius: "8px",
  border: "none",
  background: "#4CAF50",
  color: "white",
  cursor: "pointer",
  fontSize: "13px",
},

deleteBtn: {
  padding: "8px 14px",
  borderRadius: "8px",
  border: "none",
  background: "#ff4d4f",
  color: "white",
  cursor: "pointer",
  fontSize: "13px",
},

modalOverlay: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
},

modal: {
  background: "white",
  padding: "25px",
  borderRadius: "12px",
  width: "300px",
},
  wrapper: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    fontFamily: "Arial",
    background: "#f5f6f8",
  },

  left: {
    flex: 3,
  },

  right: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },

  user: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  avatar: {
    background: "#ff6b2c",
    color: "white",
    padding: "8px",
    borderRadius: "50%",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    gap: "20px",
    alignItems: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  },

  title: {
    margin: "15px 0",
  },

  primary: {
    background: "#ff6b2c",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "10px",
  },

  secondary: {
    background: "#f1f1f1",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
  },

  outlineBtn: {
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    background: "white",
    cursor: "pointer",
  },
  chatBtn: {
  marginTop: "10px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
},

  stats: {
    display: "flex",
    gap: "10px",
  },

  statBox: {
    background: "#fafafa",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
    minWidth: "80px",
  },

  petList: {
    display: "flex",
    gap: "20px",
  },

  petCard: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    width: "200px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
  },

  petImg: {
    width: "100px",
    borderRadius: "10px",
  },

  cardBtns: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  appointment: {},

  docImg: {
    width: "50px",
    borderRadius: "50%",
  },

  input: {
    display: "block",
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  actionCard: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
    cursor: "pointer",
  },

  open: {
    color: "#ff6b2c",
    fontWeight: "bold",
    fontSize: "14px",
  },

  gray: {
    color: "#777",
    fontSize: "14px",
  },
};