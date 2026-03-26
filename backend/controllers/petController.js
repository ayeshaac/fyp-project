import Pet from "../models/Pet.js";

// ================= ADD PET =================
export const addPet = async (req, res) => {
  try {
    const pet = await Pet.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= GET MY PETS =================
export const getMyPets = async (req, res) => {
  try {
    const pets = await Pet.find({ userId: req.user.id });

    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= DELETE PET =================
export const deletePet = async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);

    res.json({ message: "Pet deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= UPDATE PET =================
export const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // updated data return kare
    );

    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};