import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    portionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "DailyPortion",
    },
    questions: [
      {
        question: { type: String, required: true },
        options: [{ type: String }],
        correctAnswer: { type: String, required: true },
        userAnswer: { type: String, default: null },
      },
    ],
    score: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
