import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  console.log("Connecting to DB");
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGO_URI is not defined");
  }
  if (!isConnected) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      isConnected = true;
      console.log("Connected to DB");
    } catch (error) {
      console.log("Error connecting to DB", error);
    }
  }
};
