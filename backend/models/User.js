import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true, // Firebase UID
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    fcmToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // auto createdAt + updatedAt
  }
);

const User = mongoose.model("User", userSchema);
export default User;
