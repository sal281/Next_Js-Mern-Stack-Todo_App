import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/Todo_base';
    await mongoose.connect(uri);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process with failure
  }
};