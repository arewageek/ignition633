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
  user?: { user: IUser; authToken: string };
  message?: string;
}> {
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

  return { success: true, user: { user, authToken } };
}
