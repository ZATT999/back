import mongoose from "mongoose"

const achievementSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    requirements: { type: [String], required: true },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model("Achievement", achievementSchema)
