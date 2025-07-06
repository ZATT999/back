import Challenge from "../models/challenge.js"

// POST /api/challenges
export const createChallenge = async (req, res) => {
  const { user } = req
  console.log(user)
  try {
    const challenge = await Challenge.create({
      ...req.body,
      createdBy: user._id,
    })
    res.status(201).json(challenge)
  } catch (err) {
    res.status(500).json({ message: err.message, error: true })
  }
}

// GET /api/challenges/:id
export const getChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
    if (!challenge) return res.status(404).json({ message: "No encontrado" })
    res.json(challenge)
  } catch (err) {
    res.status(500).json({ message: err.message, error: true })
  }
}

// PUT /api/challenges/:id
export const updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(challenge)
  } catch (err) {
    res.status(500).json({ message: err.message, error: true })
  }
}

// DELETE /api/challenges/:id
export const deleteChallenge = async (req, res) => {
  try {
    await Challenge.findByIdAndDelete(req.params.id)
    res.json({ message: "Challenge eliminado" })
  } catch (err) {
    res.status(500).json({ message: err.message, error: true })
  }
}

// GET /api/challenges/room/:roomId
export const getChallengesByRoom = async (req, res) => {
  try {
    const challenges = await Challenge.find({ room: req.params.roomId })
    res.json(challenges)
  } catch (err) {
    res.status(500).json({ message: err.message, error: true })
  }
}

export const getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find()
    res.status(200).json(challenges)
  } catch (err) {
    res.status(500).json({ message: err.message, error: true })
  }
}
