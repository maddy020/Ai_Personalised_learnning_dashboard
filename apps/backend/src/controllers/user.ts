import type { Response, Request } from "express";
import type { customRequest } from "@repo/types";
import {
  createSession,
  getActiveSessionDetails,
  pauseOrResumeSession,
  deleteSession,
  completeSession,
} from "../models/user.js";

export async function handleStartSession(req: customRequest, res: Response) {
  try {
    const user = req.user;
    const response = await createSession(user);
    if (response?.success) {
      return res.status(response.status).json({
        messaage: response.message,
        success: response.success,
        session: response.session,
      });
    }
    return res
      .status(response.status)
      .json({ message: response.message, success: response.success });
  } catch (error) {
    console.log("Error in starting the session", error);
  }
}

export async function retrieveSession(req: customRequest, res: Response) {
  try {
    const user = req.user;
    if (!user)
      return res
        .status(404)
        .json({ message: "User Id not found", status: 404 });
    const response = await getActiveSessionDetails(user.id);
    if (response?.success) {
      return res.status(200).json({
        messaage: "Session Retrieved Successfully",
        success: true,
        session: response.session,
      });
    }
    return res.status(400).json({
      message: "Error in getting the session",
      success: false,
      session: null,
    });
  } catch (error) {
    console.log("Error in getting the session", error);
    return res.status(500).json({
      message: "Error in getting the session",
      success: false,
      session: null,
    });
  }
}

export async function handlePauseOrResumeSession(
  req: customRequest,
  res: Response
) {
  try {
    const { sessionId } = req.params;
    const { isResume } = req.query;
    const isPaused = isResume === "true" ? false : true;
    const parsedSessionId = parseInt(sessionId as string);
    if (!parsedSessionId)
      return res.status(404).json({
        message: "No Active Session",
        status: 404,
      });
    let endTime = null;
    if (isPaused) endTime = req.body.endTime;
    let remainingSec = 0;
    if (endTime) {
      const end = new Date(endTime);
      const now = new Date();
      const remainingMs = end.getTime() - now.getTime();
      remainingSec = Math.max(Math.floor(remainingMs / 1000), 0);
    }
    const response = await pauseOrResumeSession(
      parsedSessionId,
      isPaused,
      remainingSec
    );
    if (response?.success) {
      return res
        .status(200)
        .json({ messaage: response.message, success: response.success });
    }
    return res.status(400).json({
      message: response.message,
      success: response.success,
    });
  } catch (error) {
    console.log("Error in getting the session", error);
    return res
      .status(400)
      .json({ message: "Error in getting the session", success: false });
  }
}

export async function handleResetSession(req: customRequest, res: Response) {
  try {
    const { sessionId } = req.params;
    const parsedSessionId = parseInt(sessionId as string);
    if (!parsedSessionId)
      return res.status(404).json({
        message: "No Active Session",
        status: 404,
      });
    const response = await deleteSession(parsedSessionId);
    if (response?.success) {
      return res
        .status(200)
        .json({ messaage: response.message, success: true });
    }
    return res.status(400).json({ message: response.message, success: false });
  } catch (error) {
    console.log("Error in getting the session", error);
    return res
      .status(400)
      .json({ message: "Error in getting the session", success: false });
  }
}

export async function handleCompleteSession(req: customRequest, res: Response) {
  try {
    const user = req.user;
    const { sessionId } = req.params;
    const parsedSessionId = parseInt(sessionId as string);
    if (!parsedSessionId || !user)
      return res.status(404).json({
        message: `${user ? "No Active Session" : "No user found`"}`,
        status: 404,
      });
    const response = await completeSession(user.id, parsedSessionId);
    if (response?.success) {
      return res
        .status(200)
        .json({ messaage: response.message, success: true });
    }
    return res.status(400).json({ message: response.message, success: false });
  } catch (error) {
    console.log("Error in getting the session", error);
    return res
      .status(400)
      .json({ message: "Error in getting the session", success: false });
  }
}
