import express from "express"
import {
  createPet,
  getMyPets,
  updatePet,
  deletePet,
} from "../controllers/pet-controller.js"

const router = express.Router()

router.post("/", createPet)
router.get("/my", getMyPets)
router.put("/:id", updatePet)
router.delete("/:id", deletePet)

export default router
