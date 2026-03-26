
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const UserDashboard = () => {

  const [showModal, setShowModal] = useState(false);
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);

const [formData, setFormData] = useState({
  name: "",
  type: "",
  breed: "",
});
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

    setFormData({
      name: "",
      type: "",
      breed: "",
    });
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
    name: pet.name,
    type: pet.type,
    breed: pet.breed,
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
useEffect(() => {
  fetchPets();
}, []);

  // PET CARD COMPONENT
 const PetCard = ({ pet }) => {
  if (!pet) return null;

  return (
    <div style={styles.petCard}>
      <img src="https://placedog.net/200" style={styles.petImg} />

      <h3>{pet.name}</h3>
      <p>{pet.type} | {pet.breed}</p>
      <p>{pet.age}</p>

      <button onClick={() => handleDelete(pet._id)}>
        Delete
      </button>
      <button
  style={styles.outlineBtn}
  onClick={() => handleEdit(pet)}
>
  Edit
</button>
    </div>
  );
};

  // QUICK ACTION CARD
  const ActionCard = ({ title, desc }) => (
    <div style={styles.actionCard}>
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
            <h2>Welcome back, Zubair 👋</h2>
            <p style={styles.gray}>
              Manage your pet’s health easily—book appointments, chat with vets.
            </p>

            <div style={{ marginTop: "15px" }}>
              <button style={styles.primary}>Book Appointment</button>
              <button style={styles.secondary}>Message Vet</button>
            </div>
          </div>

          <div style={styles.stats}>
            <div style={styles.statBox}>
              <h2>2</h2>
              <p>Pets</p>
            </div>

            <div style={styles.statBox}>
              <h2>1</h2>
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
    onClick={() => setShowModal(true)}
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

        <div style={styles.card}>
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            style={styles.docImg}
          />

          <div style={{ flex: 1 }}>
            <h4>Dr. Ali Raza</h4>
            <p style={styles.gray}>Veterinarian</p>
          </div>

          <button style={styles.primary}>+ Book</button>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        <h3>Quick Actions</h3>

        <ActionCard
          title="Book Appointment"
          desc="Schedule consultation"
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
  name="name"
  placeholder="name"
  value={formData.name}
  onChange={handleChange}
/>

<input
  name="type"
  placeholder="type"
  value={formData.type}
  onChange={handleChange}
/>

<input
  name="breed"
  placeholder="breed"
  value={formData.breed}
  onChange={handleChange}
/>

      <div style={{ marginTop: "10px" }}>
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