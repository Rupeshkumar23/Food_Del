import foodModel from "../models/foodModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// add food item

const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    let uploadResult;
    if (req.file && req.file.buffer) {
      uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "food_delivery", resource_type: "image" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
    } else {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: uploadResult.secure_url,
      cloudinary_id: uploadResult.public_id,
    });
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log("Error in adding Food :", error);
    res.json({ success: false, message: "Error" });
  }
};

// all food list

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log("Error in getting the data", error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove  food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (food) {
      if (food.cloudinary_id) {
        try {
          await cloudinary.uploader.destroy(food.cloudinary_id);
        } catch (destroyError) {
          console.error("Cloudinary destroy error:", destroyError);
        }
      } else {
        // No Cloudinary id — previously we removed a local file in `uploads`.
        // Since the app no longer persists files to `uploads`, there's nothing to unlink here.
      }
    }
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log("Error in getting the data", error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
