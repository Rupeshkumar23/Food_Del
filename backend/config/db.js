import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI?.trim();

  if (!mongoUri) {
    console.error(
      "Missing MONGO_URI. Add a valid MongoDB connection string to backend/.env."
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database connection error:", error.message);
    if (error.message.includes("querySrv") || error.message.includes("ENOTFOUND")) {
      console.error(
        "Atlas DNS lookup failed. Verify your MONGO_URI host, cluster name, and network DNS access."
      );
    }
    process.exit(1);
  }
};