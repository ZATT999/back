import Achievement from "../models/achievement.js"

export const getAchievementById = async (req, res) => {
  const { id } = req.params

  try {
    const achievement = await Achievement.findById(id)
    if (!achievement)
      return res.status(404).json({ message: "Logro no encontrado" })

    res.json(achievement)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/achievements
export const getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find()
    res.json(achievements)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/achievements
export const createAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.create(req.body)
    res.status(201).json(achievement)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// PUT /api/achievements/:id
export const updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(achievement)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE /api/achievements/:id
export const deleteAchievement = async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id)
    res.json({ message: "Logro eliminado" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
