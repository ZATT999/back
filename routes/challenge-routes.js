import express from "express"
import {
  createChallenge,
  getChallenge,
  updateChallenge,
  deleteChallenge,
  getChallengesByRoom,
  getAllChallenges,
} from "../controllers/challenge-controller.js"
import { authorizeRoles } from "../middleware/auth-middleware.js"

const router = express.Router()

// profesores y admins pueden crear/editar
router.get("/", getAllChallenges)
router.get("/:id", getChallenge)
router.post("/", authorizeRoles("admin"), createChallenge)
router.put("/:id", authorizeRoles("admin"), updateChallenge)
router.delete("/:id", authorizeRoles("admin"), deleteChallenge)

// lista de challenges por room
router.get("/room/:roomId", getChallengesByRoom)

export default router
