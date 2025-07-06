import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    avatar: {
      type: String,
      default: function () {
        return `https://api.dicebear.com/9.x/pixel-art/svg?seed=${this.username}`
      },
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["estudiante", "profesor", "admin"],
      default: "estudiante",
    },
    xp: {
      xp: { type: Number, default: 0 },
      totalXp: { type: Number, default: 100 },
    },
    level: {
      level: { type: Number, default: 0 },
      totalLevel: { type: Number, default: 100 },
    },
    mastery: {
      type: String,
      default: "prescolar",
    },
    achievements: {
      type: Array,
      default: [],
    },

    pets: { type: Array, default: [] },
  },
  { timestamps: true }
)

// hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

// comparar password
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

export default mongoose.model("User", userSchema)
