import mongoose from "mongoose";

 export const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://Rupeshkumar:w6lfKwMfIJuVzBo6@cluster0.ur1q1oa.mongodb.net/food_del").then(()=>{
        console.log("Database Connected Successfully")
    })
}