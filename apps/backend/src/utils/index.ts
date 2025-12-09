import { createUser } from "../models/auth.js";
import bcrypt from "bcrypt";
import { getLastActivationDate, updateDBStreaks } from "../models/user.js";
export async function seedDb() {
  try {
    const password = "Guest@1";
    const saltRounds = 10;
    const genSalt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, genSalt);
    await createUser("Guest", "guest.learner@gmail.com", hashedPassword);
    return;
  } catch (error) {
    console.log("Error in seeding database", error);
    return;
  }
}

export async function updateUserStreaks(user: any) {
  try {
    const { lastActivationDate, days } = await getLastActivationDate(user);
    let updatedStreak = days;
    if (Date.now() - lastActivationDate > 1) {
      updatedStreak = 1;
    } else updatedStreak = updatedStreak + 1;
    const response = await updateDBStreaks(user, updatedStreak);
    return { status: 200, message: "Success", newStreak: response.newStreak };
  } catch (error) {
    console.log("error in updating db streaks", error);
    return { status: 400, message: "Error" };
  }
}
