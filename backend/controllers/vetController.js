import Vet from "../models/Vet.js";

// 1️⃣ Register Vet
export const registerVet = async (req, res) => {
  try {
    const vet = await Vet.create(req.body);
    res.status(201).json({ message: "Vet registered", vet });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 2️⃣ GET APPROVED vets (Public Vets page)
export const getVets = async (req, res) => {
  try {
    const { specialization, city } = req.query;

    let filter = { status: "approved" };

    if (specialization) filter.specialization = specialization;
    if (city) filter.city = city;

    const vets = await Vet.find(filter);
    res.status(200).json(vets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3️⃣ GET PENDING vets (Admin)
export const getPendingVets = async (req, res) => {
  try {
    const vets = await Vet.find({ status: "pending" });
    res.status(200).json(vets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4️⃣ APPROVE vet
export const approveVet = async (req, res) => {
  try {
    const vet = await Vet.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.status(200).json(vet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5️⃣ REJECT vet
export const rejectVet = async (req, res) => {
  try {
    const vet = await Vet.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    res.status(200).json(vet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
