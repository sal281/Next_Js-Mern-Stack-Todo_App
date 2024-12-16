import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    // MongoDB URI from environment variable
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MongoDB URI not found in environment variables");
    }

    // Connect to MongoDB
    await mongoose.connect(uri);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process with failure
  }
};
