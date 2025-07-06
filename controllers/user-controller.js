import User from "../models/user.js"
import Achievement from "../models/achievement.js"

// GET /api/users/me
export const getMyProfile = async (req, res) => {
  res.json(req.user)
}

// PUT /api/users/me
export const updateMyProfile = async (req, res) => {
  const { username } = req.body

  try {
    req.user.username = username || req.user.username
    await req.user.save()

    res.json(req.user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/users/:id
export const getProfile = async (req, res) => {
  const { username } = req.params

  try {
    const user = await User.findOne({ username })
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" })

    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// PUT /api/users/xp
export const updateXP = async (req, res) => {
  const { xp } = req.body

  try {
    const user = await User.findById(req.user._id)

    user.xp.xp += xp

    while (user.xp.xp >= user.xp.totalXp) {
      const difference = user.xp.xp - user.xp.totalXp
      const aunment = user.xp.totalXp * 1.3
      user.xp.totalXp = parseInt(aunment)
      user.xp.xp = difference
      user.level.level += 1

      if (user.level.level >= user.level.totalLevel) {
        user.level.totalLevel += 1
        user.level.totalLevel = parseInt(user.level.totalLevel * 1.2)
      }
    }

    await user.save()

    res.json({ xp: user.xp, level: user.level })
  } catch (err) {
    res.status(500).json({ message: err.message, error: true })
  }
}

// PUT /api/users/achievements
export const addAchievement = async (req, res) => {
  const { name } = req.body
  try {
    const achievement = await Achievement.findOne({ name })
    if (!achievement) {
      return res.status(404).json({ message: "Logro no encontrado" })
    }
    const user = await User.findById(req.user._id)
    if (user.achievements.includes(achievement._id)) {
      return res.status(400).json({ message: "Logro ya añadido" })
    }
    user.achievements.push(achievement._id)
    await user.save()
    return res.status(201).json(achievement)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
