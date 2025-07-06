import mongoose from "mongoose"

const challengeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["facil", "medio", "dificil"],
      default: "facil",
    },
    questions: [
      {
        question: String,
        options: [String],
        correctAnswer: String,
        xpReward:Number,
      },
    ],
    xpReward: { type: Number, default: 10 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", default: null },
    type: { type: String, enum: ["quiz", "game"], default: "quiz" },
  },
  { timestamps: true }
)

export default mongoose.model("Challenge", challengeSchema)
