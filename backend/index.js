// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Utiles
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// test mongoose connection:
app.get("/", (req, res) => {
  res.send("Backend Server Listening for endpoints: >>👂👂👂<<! ");
});

app.use("/api/users", userRoutes);
// app.use("/api/category", categoryRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/upload", uploadRoutes);
// app.use("/api/orders", orderRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));
