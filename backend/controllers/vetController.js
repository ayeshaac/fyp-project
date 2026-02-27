import Vet from "../models/Vet.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// 1️⃣ Register Vet (Signup)
export const registerVet = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      specialization,
      experience,
      city,
      description
    } = req.body;

    // Check existing email
    const existingVet = await Vet.findOne({ email });
    if (existingVet) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const vet = await Vet.create({
      name,
      email,
      password: hashedPassword,
      phone,
      specialization,
      experience,
      city,
      description,
      role: "vet",
      status: "pending"
    });

    res.status(201).json({
      message: "Application submitted successfully. Wait for admin approval.",
      vet
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 2️⃣ Login Vet
export const loginVet = async (req, res) => {
  try {
    const { email, password } = req.body;

    const vet = await Vet.findOne({ email });
    if (!vet) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, vet.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (vet.status !== "approved") {
      return res.status(403).json({ message: "Account not approved yet" });
    }

    const token = jwt.sign(
      { id: vet._id, role: vet.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      vet: {
        id: vet._id,
        name: vet.name,
        email: vet.email,
        role: vet.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 3️⃣ GET APPROVED vets
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


// 4️⃣ GET PENDING vets (Admin)
export const getPendingVets = async (req, res) => {
  try {
    const vets = await Vet.find({ status: "pending" });
    res.status(200).json(vets);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 5️⃣ APPROVE vet
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


// 6️⃣ REJECT vet
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