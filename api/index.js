import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Add your frontend's URL
  credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
  console.error("Error details:", err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    succes: false,
    statusCode: statusCode,
    message: message,
  });
});
