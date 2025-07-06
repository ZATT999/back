import mongoose from "mongoose"

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    level: { type: Number, default: 1 },
  },
  { timestamps: true }
)

export default mongoose.model("Pet", petSchema)
