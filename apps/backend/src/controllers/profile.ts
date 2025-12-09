import type { Request, Response } from "express";
import { completeProfile } from "../models/profile.js";
export async function handleProfileCreation(req: Request, res: Response) {
  try {
    const { interests, skillLevel, avatar } = req.body;
    if (!(interests || skillLevel || avatar)) {
      return res.status(404).json({ message: "Empty fields", status: 404 });
    }
    const response = await completeProfile(interests, skillLevel, avatar);
    console.log("response", response);
    if (response.status === 200) {
      return res
        .status(200)
        .json({ message: "Profile Completed", status: 200 });
    }
    return res
      .status(400)
      .json({ message: "Error in Profile Completion", status: 400 });
  } catch (error) {
    console.log("Error in profile controller", error);
    return res
      .status(500)
      .json({ message: "Error in Profile Completion", status: 500 });
  }
}
