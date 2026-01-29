import mongoose from "mongoose";

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected successfully");
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;
