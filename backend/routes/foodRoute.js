import express from "express";
import { addFood,listFood,removeFood } from "../controllers/foodController.js";
import multer from "multer";
const foodRouter = express.Router();

// Use memory storage for uploads to avoid writing to a local `uploads` folder.
const upload = multer({ storage: multer.memoryStorage() });


foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)





export default foodRouter;