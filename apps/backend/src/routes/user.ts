import { Router } from "express";
import {
  handlePauseOrResumeSession,
  handleStartSession,
  retrieveSession,
  handleResetSession,
  handleCompleteSession,
} from "../controllers/user.js";

const router = Router();

router.post("/startSession", handleStartSession);
router.get("/getSession", retrieveSession);
router.patch("/pauseOrResumeSession/:sessionId", handlePauseOrResumeSession);
router.delete("/resetSession/:sessionId", handleResetSession);
router.patch("/completeSession/:sessionId", handleCompleteSession);

export default router;
