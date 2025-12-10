import { prisma } from "@repo/database";
import { SessionStatus } from "@repo/types";
export async function getLastActivationDate(user: any) {
  try {
    const userDetails = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
      include: {
        streak: true,
      },
    });
    return {
      status: 200,
      message: "Success",
      lastActivationDate: userDetails.streak.lastActivationDate,
      days: userDetails.streak.days,
    };
  } catch (error) {
    console.log("Error in getting the activation date", error);
    return { status: 400, message: "Error" };
  }
}

export async function updateDBStreaks(user: any, newStreak: number) {
  try {
    const userDetails = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    await prisma.streak.update({
      where: {
        userId: userDetails.id,
      },
      data: {
        days: newStreak,
        lastActivationDate: new Date(),
      },
    });
    return {
      status: 200,
      message: "Success",
      newStreak,
    };
  } catch (error) {
    console.log("Error in getting the activation date", error);
    return { status: 400, message: "Error" };
  }
}

export async function createSession(user: any) {
  try {
    const userId = user.id;
    const isActiveSession = await prisma.focusSession.findFirst({
      where: {
        userId: userId,
        status: { in: [SessionStatus[0], SessionStatus[2]] },
      },
    });
    if (
      isActiveSession &&
      (isActiveSession.status == SessionStatus[0] ||
        isActiveSession.status == SessionStatus[2])
    ) {
      return {
        success: false,
        status: 400,
        message: "User cannot have more than 1 active session",
      };
    }
    const session = await prisma.focusSession.create({
      data: {
        startTime: new Date(),
        endTime: new Date(Date.now() + 25 * 60 * 1000),
        userId,
      },
    });
    return {
      success: true,
      status: 200,
      session: session,
      message: "Session Created Successfully",
    };
  } catch (error) {
    console.log("error in creting the entry in db for session", error);
    return {
      message: "Error in creating the session",
      success: false,
      status: 500,
      session: null,
    };
  }
}

export async function getActiveSessionDetails(userId: Number) {
  try {
    if (!userId) {
      return {
        message: "Session not found",
        success: true,
        status: 404,
      };
    }
    const session = await prisma.focusSession.findFirst({
      where: {
        userId: userId,
        status: SessionStatus[0] || SessionStatus[2],
      },
    });
    if (session) {
      return {
        message: "Session Retrieved Successfully",
        success: true,
        session,
        status: 200,
      };
    }
    return {
      message: "Error in getting the session",
      success: false,
      status: 400,
    };
  } catch (error) {
    console.log("Error in getting the session", error);
    return {
      message: "Error in getting the session",
      success: false,
      status: 500,
    };
  }
}

export async function pauseOrResumeSession(
  sessionId: Number,
  isPaused: Boolean,
  remainingSeconds?: Number
) {
  try {
    if (!sessionId) {
      return {
        message: "Session not found",
        success: true,
        status: 404,
      };
    }
    await prisma.focusSession.update({
      where: {
        id: sessionId,
      },
      data: {
        remainingsec: isPaused ? remainingSeconds : null,
        status: isPaused ? SessionStatus[2] : SessionStatus[0],
      },
    });
    return {
      message: "Session Paused Successfully",
      success: true,
      status: 200,
    };
  } catch (error) {
    console.log("Error in pausing the session", error);
    return {
      message: "Error in pausing the session",
      success: false,
      status: 500,
    };
  }
}

export async function resumeSession(sessionId: Number) {
  try {
    if (!sessionId) {
      return {
        message: "Session not found",
        success: true,
        status: 404,
      };
    }
    const session = await prisma.focusSession.findUnique({
      where: {
        id: sessionId,
      },
    });
    await prisma.studySesssion.update({
      where: {
        id: sessionId,
      },
      data: {
        startTime: Date.now(),
        endTime: Date.now() + session.remainingsec,
        remainingsec: null,
      },
    });
    return {
      message: "Session Resumed Successfully",
      success: false,
      status: 200,
    };
  } catch (error) {
    console.log("Error in Resuming the session", error);
    return {
      message: "Error in Resuming the session",
      success: false,
      status: 500,
    };
  }
}

export async function completeSession(userId: Number, sessionId: Number) {
  try {
    if (sessionId) {
      await prisma.focusSession.update({
        where: {
          id: sessionId,
          userId: userId,
        },
        data: {
          status: SessionStatus[1],
        },
      });
    }
    return {
      success: true,
      status: 200,
      message: "Session Completed",
    };
  } catch (error) {
    console.log("Error in completing  the session", error);
    return {
      success: false,
      status: 500,
      message: "Internal Server Error",
    };
  }
}

export async function deleteSession(sessionId: Number) {
  try {
    if (sessionId) {
      await prisma.focusSession.delete({
        where: {
          id: sessionId,
        },
      });
    }
    return {
      success: true,
      status: 200,
      message: "Session Deleted",
    };
  } catch (error) {
    console.log("error in deleting the session", error);
    return {
      success: false,
      status: 500,
      message: "Internal Server Error",
    };
  }
}
