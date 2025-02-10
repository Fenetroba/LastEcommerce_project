import mongoose from "mongoose";

const UserAuth = new mongoose.Schema(
  {
    UserName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);
const UserAuthData = mongoose.model("UserAuth", UserAuth);
export default UserAuthData;
