"use server";

import connectDB from "@/config/db";
import User, { IUser } from "@/models/user.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IAuth {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export async function authenticate({
  username,
  password,
  rememberMe,
}: IAuth): Promise<{
  success: boolean;
  user?: string;
  message?: string;
}> {
  try {
    await connectDB();

    const user = await User.findOne({ username });
    if (!user) return { success: false, message: "Username does not exist" };

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches)
      return { success: false, message: "Password does not match" };

    //   create jwt token for user
    const AUTH_SECRET = process.env.AUTH_SECRET!;
    const authToken = jwt.sign(
      {
        user,
        rememberMe,
      },
      AUTH_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return { success: true, user: authToken };
  } catch (error: any) {
    return { success: false, message: error.message || "Server error" };
  }
}

export async function simulateNewAccount() {
  try {
    connectDB();

    const salt = await bcrypt.genSalt(10);

    const hashed = await bcrypt.hash("incorrect", salt);

    const user = new User({ username: "arewa", password: hashed });

    user.save();

    console.log({ user });

    return { success: true };
  } catch (error: any) {
    return { success: false };
  }
}
