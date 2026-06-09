import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    const imageFilename = req.file.filename;
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${imageFilename}`;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: imageUrl,
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
      const filename = food.image.startsWith("http")
        ? food.image.split("/images/").pop()
        : food.image;
      fs.unlink(`uploads/${filename}`, () => {});
    }
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log("Error in getting the data", error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
