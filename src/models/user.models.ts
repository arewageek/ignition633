import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    rememberMe: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
