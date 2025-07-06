import Pet from "../models/pet.js"

// POST /api/pets
export const createPet = async (req, res) => {
  try {
    const pet = await Pet.create({
      ...req.body,
      owner: req.user._id,
    })
    res.status(201).json(pet)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/pets/my
export const getMyPets = async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.user._id })
    res.json(pets)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// PUT /api/pets/:id
export const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(pet)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE /api/pets/:id
export const deletePet = async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id)
    res.json({ message: "Mascota eliminada" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
