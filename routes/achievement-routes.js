import express from "express"
import {
  getAllAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  getAchievementById,
} from "../controllers/achievement-controller.js"
import { authorizeRoles } from "../middleware/auth-middleware.js"

const router = express.Router()

router.get("/:id", getAchievementById)
router.get("/", getAllAchievements)
router.post("/", authorizeRoles("admin"), createAchievement)
router.put("/:id", authorizeRoles("admin"), updateAchievement)
router.delete("/:id", authorizeRoles("admin"), deleteAchievement)

export default router
