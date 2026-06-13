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

    const localPath = req.file.path;
    let uploadResult;
    try {
      uploadResult = await cloudinary.uploader.upload(localPath, {
        folder: "food_delivery",
        resource_type: "image",
      });
    } finally {
      fs.unlink(localPath, () => {});
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
        let filename = food.image;
        if (filename.startsWith("http")) {
          const matches = filename.match(/(?:\/images\/|\/uploads\/)([^\/]+)$/);
          filename = matches ? matches[1] : filename;
        } else if (filename.startsWith("/images/") || filename.startsWith("/uploads/")) {
          filename = filename.split("/").pop();
        }
        const filePath = path.join(__dirname, "..", "uploads", filename);
        fs.unlink(filePath, () => {});
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
