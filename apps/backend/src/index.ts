import express from "express";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import userRoutes from "./routes/user.js";
import cors from "cors";
import { seedDb } from "./utils/index.js";
import { checkUser } from "./middleware/user.js";
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/user", checkUser, userRoutes);

app.listen(PORT, async () => {
  await seedDb();
  console.log(`Server is running at the port ${PORT}`);
});
export default app;
