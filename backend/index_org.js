//packages:
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// utils:
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const port = process.env.PORT || 9000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// test mongoose connection:
app.get("/", (req, res) => {
  res.send("Hello World!");
})

// test mongoose connection:
app.post("/api/users", userRoutes);

app.listen(port, () => console.log(`\n🛸 Express server is up & running on port: ${port}...🚀\n`) );
// app.listen(port, () => console.log(`Server running on port: ${port}`));
