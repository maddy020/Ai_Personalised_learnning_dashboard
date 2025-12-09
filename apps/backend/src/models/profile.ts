import { prisma } from "@repo/database";
export async function completeProfile(
  interests: Array<string>,
  skillLevel: string,
  avatar: string
) {
  try {
    const email = "guest.learner@gmail.com";
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { status: 401, message: "Invalid user" };
    }

    await prisma.user.update({
      where: { email },
      data: {
        skillLevel,
        avatar,
        interestedFields: interests,
      },
    });
    return { status: 200, message: "Login Successfull", user };
  } catch (error) {
    console.log("error", error);
    return { status: 400, message: "Error in logging the user" };
  }
}
