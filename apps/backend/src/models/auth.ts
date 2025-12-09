import { prisma } from "@repo/database";
import bcrypt from "bcrypt";

export async function createUser(
  name: string,
  email: string,
  hashedPassword: string
) {
  try {
    const existing = await prisma.User.findUnique({
      where: {
        email,
      },
    });
    if (existing) {
      return { status: 409, message: "User already Exists" };
    }
    const user = await prisma.User.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await prisma.Streak.create({
      data: {
        userId: user.id,
      },
    });
    return { status: 200, message: "User signed up successfully" };
  } catch (error) {
    return { status: 400, message: "Error in creating the user" };
  }
}

export async function checkValidUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { status: 401, message: "Invalid credentials" };
    }

    if (!user.password) {
      return {
        status: 403,
        message:
          "This email is registered using Google/OAuth. Login with Google.",
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { status: 401, message: "Invalid credentials" };
    }
    return { status: 200, message: "Login Successfull", user };
  } catch (error) {
    return { status: 400, message: "Error in logging the user" };
  }
}
