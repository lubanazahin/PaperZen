import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import planRoutes from "./routes/planRoutes.js";

// Load environment variables (.env)
try {
  process.loadEnvFile();
} catch {
  // If .env is not present, use defaults
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/plans", planRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "PaperZen API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
