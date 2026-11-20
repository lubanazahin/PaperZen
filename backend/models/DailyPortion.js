import mongoose from "mongoose";

const dailyPortionSchema = new mongoose.Schema(
  {
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Plan",
    },
    dayNumber: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    pageStart: {
      type: Number,
      required: true,
    },
    pageEnd: {
      type: Number,
      required: true,
    },
    scheduledTime: {
      type: String, // e.g. "09:00"
      default: null,
    },
    actualStartTime: {
      type: Date,
      default: null,
    },
    actualEndTime: {
      type: Date,
      default: null,
    },
    durationMinutes: {
      type: Number, // কত মিনিট পড়েছে
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    notes: {
      summary: { type: String, default: "" },
      concepts: [{ type: String }],
      examples: [{ type: String }],
    },
  },
  {
    timestamps: true,
  }
);

const DailyPortion = mongoose.model("DailyPortion", dailyPortionSchema);
export default DailyPortion;
