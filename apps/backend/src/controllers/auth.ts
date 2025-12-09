import type { Request, Response } from "express";
import { checkValidUser, createUser } from "../models/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { updateUserStreaks } from "../utils/index.js";

export async function handleSignup(req: Request, res: Response) {
  try {
    const { formData } = req.body;
    const { name, email, password } = formData;
    if (!(name || email || password)) {
      return res.status(404).json({ message: "Fields can not be empty" });
    }
    const saltRounds = 10;
    const genSalt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, genSalt);
    const response = await createUser(name, email, hashedPassword);
    if (response.status == 200) {
      const payload = { name, email };
      const jwt_secret = process.env.JWT_SECRET;
      const token = jwt.sign(payload, jwt_secret || "JWTSECRET");
      return res
        .status(200)
        .json({ message: "User Signed Up Successfully", status: 200, token });
    }
    return res
      .status(400)
      .json({ message: "Error in creating the user", status: 400, token: "" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error in creating the user", status: 400, token: "" });
  }
}

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { formData } = req.body;
    const { email, password } = formData;

    if (!email || !password) {
      res.status(400).json({
        message: "Email and password required",
        status: 400,
        token: "",
      });
    }

    const response = await checkValidUser(email, password);
    if (response?.status == 200) {
      const payload = {
        name: response.user.name,
        email: response.user.email,
        id: response.user.id,
      };
      const jwt_secret = process.env.JWT_SECRET;
      const token = jwt.sign(payload, jwt_secret || "JWTSECRET");
      await updateUserStreaks(response.user);
      return res
        .status(200)
        .json({ message: response.message, status: 200, token });
    }
    return res
      .status(response?.status || 400)
      .json({ message: response?.message });
  } catch (error) {
    console.log("Error in login", error);
    res.status(500).json({ message: "Login failed", status: 500, token: "" });
  }
};
