import express from "express"
import {
  getMyProfile,
  getProfile,
  updateMyProfile,
  updateXP,
  addAchievement,
} from "../controllers/user-controller.js"

const router = express.Router()

router.get("/me", getMyProfile)
router.put("/me", updateMyProfile)
router.put("/xp", updateXP)
router.put("/achievements", addAchievement)
router.get("/profile/:username", getProfile)

export default router
