import dns from "node:dns";
import mongoose from "mongoose";


try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
  console.warn("Could not set custom DNS servers:", e.message);
}

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      try {
        process.loadEnvFile();
      } catch {
        
      }
    }

    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is not set in environment variables or .env file");
    }

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(` MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(` MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
