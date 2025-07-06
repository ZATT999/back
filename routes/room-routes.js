import express from "express"
import {
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
  joinRoom,
  leaveRoom,
} from "../controllers/room-controller.js"
import { authorizeRoles } from "../middleware/auth-middleware.js"

const router = express.Router()

// solo profesores pueden crear
router.post("/", authorizeRoles("teacher", "admin"), createRoom)
router.get("/:id", getRoom)
router.put("/:id", authorizeRoles("teacher", "admin"), updateRoom)
router.delete("/:id", authorizeRoles("teacher", "admin"), deleteRoom)

// unirse/salir de rooms
router.post("/:id/join", joinRoom)
router.post("/:id/leave", leaveRoom)

export default router
