import express from "express";
import Plan from "../models/Plan.js";
import DailyPortion from "../models/DailyPortion.js";

const router = express.Router();

// POST /api/plans — নতুন plan তৈরি + automatic DailyPortions generate
router.post("/", async (req, res) => {
  try {
    const uid = req.headers["x-user-uid"];

    if (!uid) {
      return res.status(401).json({ message: "x-user-uid header is required" });
    }

    const { title, fileUrl, totalPages, daysToFinish, startDate, studyTimes } =
      req.body;

    if (!title || !fileUrl || !totalPages || !daysToFinish || !startDate) {
      return res.status(400).json({
        message: "title, fileUrl, totalPages, daysToFinish, startDate are required",
      });
    }

    // Plan create
    const plan = await Plan.create({
      userId: uid,
      title,
      fileUrl,
      totalPages,
      daysToFinish,
      startDate: new Date(startDate),
      studyTimes: studyTimes || [],
      status: "active",
    });

    // Auto-generate DailyPortions
    const pagesPerDay = Math.ceil(totalPages / daysToFinish);
    const portions = [];

    for (let i = 0; i < daysToFinish; i++) {
      const pageStart = i * pagesPerDay + 1;
      const pageEnd = Math.min((i + 1) * pagesPerDay, totalPages);

      // skip if pageStart already exceeds totalPages
      if (pageStart > totalPages) break;

      const portionDate = new Date(startDate);
      portionDate.setDate(portionDate.getDate() + i);

      // studyTimes theke first time ta nilam as scheduled time
      const scheduledTime =
        studyTimes && studyTimes.length > 0 ? studyTimes[0].time : null;

      portions.push({
        planId: plan._id,
        dayNumber: i + 1,
        date: portionDate,
        pageStart,
        pageEnd,
        scheduledTime,
        status: "pending",
      });
    }

    const dailyPortions = await DailyPortion.insertMany(portions);

    res.status(201).json({
      message: "Plan created with daily portions",
      plan,
      dailyPortions,
    });
  } catch (error) {
    console.error("Create plan error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/plans — user-er shob plans
router.get("/", async (req, res) => {
  try {
    const uid = req.headers["x-user-uid"];

    if (!uid) {
      return res.status(401).json({ message: "x-user-uid header is required" });
    }

    const plans = await Plan.find({ userId: uid }).sort({ createdAt: -1 });
    res.status(200).json(plans);
  } catch (error) {
    console.error("Get plans error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/plans/:id — ekta specific plan + tar daily portions
router.get("/:id", async (req, res) => {
  try {
    const uid = req.headers["x-user-uid"];

    if (!uid) {
      return res.status(401).json({ message: "x-user-uid header is required" });
    }

    const plan = await Plan.findOne({ _id: req.params.id, userId: uid });

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const dailyPortions = await DailyPortion.find({ planId: plan._id }).sort({
      dayNumber: 1,
    });

    res.status(200).json({ plan, dailyPortions });
  } catch (error) {
    console.error("Get plan error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT /api/plans/:id — plan update (title, studyTimes, status etc.)
router.put("/:id", async (req, res) => {
  try {
    const uid = req.headers["x-user-uid"];

    if (!uid) {
      return res.status(401).json({ message: "x-user-uid header is required" });
    }

    const plan = await Plan.findOneAndUpdate(
      { _id: req.params.id, userId: uid },
      req.body,
      { new: true, runValidators: true }
    );

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.status(200).json({ message: "Plan updated", plan });
  } catch (error) {
    console.error("Update plan error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /api/plans/:id — plan delete + shob related DailyPortions o delete
router.delete("/:id", async (req, res) => {
  try {
    const uid = req.headers["x-user-uid"];

    if (!uid) {
      return res.status(401).json({ message: "x-user-uid header is required" });
    }

    const plan = await Plan.findOneAndDelete({
      _id: req.params.id,
      userId: uid,
    });

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Plan er shob DailyPortions o delete koro
    await DailyPortion.deleteMany({ planId: plan._id });

    res.status(200).json({ message: "Plan and its portions deleted" });
  } catch (error) {
    console.error("Delete plan error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
