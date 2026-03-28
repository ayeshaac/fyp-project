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
// ✅ UPDATE APPOINTMENT STATUS (Vet: approve / reject)
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // sirf approved ya rejected allow hoga
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // appointment find karo
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // check karo ye appointment isi logged-in vet ki hai
    if (appointment.vetId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this appointment" });
    }

    // status update
    appointment.status = status;
    await appointment.save();

    res.json({
      message: `Appointment ${status} successfully`,
      appointment,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};