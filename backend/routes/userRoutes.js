import express from "express";
import User from "../models/User.js";

const router = express.Router();

// POST /api/users/sync — Firebase login-er por user ke MongoDB te save/update
router.post("/sync", async (req, res) => {
  try {
    const { uid, email, name } = req.body;

    if (!uid || !email || !name) {
      return res.status(400).json({ message: "uid, email, and name are required" });
    }

    // upsert: thakle update korbe, na thakle create korbe
    const user = await User.findOneAndUpdate(
      { uid },
      { uid, email, name },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json({ message: "User synced successfully", user });
  } catch (error) {
    console.error("User sync error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/users/me — logged-in user-er info pawa
router.get("/me", async (req, res) => {
  try {
    const uid = req.headers["x-user-uid"];

    if (!uid) {
      return res.status(401).json({ message: "x-user-uid header is required" });
    }

    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Get user error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT /api/users/me/fcm-token — notification token save kora
router.put("/me/fcm-token", async (req, res) => {
  try {
    const uid = req.headers["x-user-uid"];
    const { fcmToken } = req.body;

    if (!uid) {
      return res.status(401).json({ message: "x-user-uid header is required" });
    }

    if (!fcmToken) {
      return res.status(400).json({ message: "fcmToken is required" });
    }

    const user = await User.findOneAndUpdate(
      { uid },
      { fcmToken },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "FCM token updated", user });
  } catch (error) {
    console.error("FCM token update error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
