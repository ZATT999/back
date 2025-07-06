import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user-routes.js"
import challengeRoutes from "./routes/challenge-routes.js"
import roomRoutes from "./routes/room-routes.js"
import petRoutes from "./routes/pet-routes.js"
import authRoutes from "./routes/auth-routes.js"
import achievementsRoutes from "./routes/achievement-routes.js"
import { protect } from "./middleware/auth-middleware.js"

dotenv.config()

const app = express()

// Middlewares
app.use(express.json())
app.use(cookieParser())

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL, // tu frontend
    credentials: true,
  })
)

// Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error(err))

// Rutas
app.use("/api/users", protect, userRoutes)
app.use("/api/challenges", protect, challengeRoutes)
app.use("/api/rooms", protect, roomRoutes)
app.use("/api/pets", protect, petRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/achievements", protect, achievementsRoutes)

// Puerto
const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`))
