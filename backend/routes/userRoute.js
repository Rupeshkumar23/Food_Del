import express from "express";
import { loginUser, registerUser, getUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js"; // Ensure this path is correct

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", authMiddleware, getUser); // Protected route to get user profile

export default userRouter;
