import express from "express";
import { addFood,listFood,removeFood } from "../controllers/foodController.js";
import multer from "multer";
import fs from "fs";
import path from "path";


const foodRouter = express.Router();

// Image Storage Engine

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });


foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)





export default foodRouter;