import Room from "../models/room.js"

// POST /api/rooms
export const createRoom = async (req, res) => {
  try {
    const room = await Room.create({
      ...req.body,
      teacher: req.user._id,
    })
    res.status(201).json(room)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/rooms/:id
export const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate("students", "username")
      .populate("challenges")
    if (!room) return res.status(404).json({ message: "No encontrado" })
    res.json(room)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// PUT /api/rooms/:id
export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(room)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE /api/rooms/:id
export const deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id)
    res.json({ message: "Room eliminada" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/rooms/:id/join
export const joinRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
    if (!room) return res.status(404).json({ message: "No encontrado" })

    if (!room.students.includes(req.user._id)) {
      room.students.push(req.user._id)
      await room.save()
    }
    res.json(room)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/rooms/:id/leave
export const leaveRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
    if (!room) return res.status(404).json({ message: "No encontrado" })

    room.students = room.students.filter(
      (s) => s.toString() !== req.user._id.toString()
    )
    await room.save()
    res.json(room)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
