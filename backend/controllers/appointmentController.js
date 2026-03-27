import Appointment from "../models/Appointment.js";


// ➕ CREATE APPOINTMENT
export const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 📥 GET USER APPOINTMENTS
export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      userId: req.user.id,
    })
      .populate("petId")
      .populate("vetId");

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 👨‍⚕️ GET VET APPOINTMENTS
export const getVetAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      vetId: req.user.id,
    })
      .populate("petId")
      .populate("userId");

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};