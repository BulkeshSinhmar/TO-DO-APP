import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { auth } from "./middleware/authMiddleware.js";

const app = express();
dotenv.config();

app.use(express.json()); //middleware -> req middleware  res

dbConnect();

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));

app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/todo", todoRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
