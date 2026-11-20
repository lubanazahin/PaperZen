import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    daysToFinish: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    studyTimes: [
      {
        time: { type: String }, // e.g. "09:00"
        label: { type: String }, // e.g. "Morning", "Evening"
      },
    ],
    status: {
      type: String,
      enum: ["active", "completed", "paused"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Plan = mongoose.model("Plan", planSchema);
export default Plan;
