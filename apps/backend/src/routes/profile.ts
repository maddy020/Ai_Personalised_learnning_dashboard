import { Router } from "express";
import { handleProfileCreation } from "../controllers/profile.js";
import { checkUser } from "../middleware/user.js";

const router = Router();

router.post("/complete", checkUser, handleProfileCreation);

export default router;
