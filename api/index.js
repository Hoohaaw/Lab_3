import express from "express";
import { fileURLToPath } from "url";
import { connectToDatabase } from "../public/config/mongoose.js";
import { router } from "../public/routes/router.js";
import feedRoutes from "../public/routes/feedRoutes.js";
import userRoutes from "../public/routes/userRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

// Serve static files
const publicDir = fileURLToPath(new URL("../public", import.meta.url));
app.use(express.static(publicDir));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cookie parser middleware
app.use(cookieParser());

// View engine setup (EJS)
app.set("view engine", "ejs");
const viewsDir = fileURLToPath(new URL("../views", import.meta.url));
app.set("views", viewsDir);

// Middleware to ensure DB connection before handling requests
app.use(async (req, res, next) => {
  try {
    await connectToDatabase(process.env.DB_CONNECTION_STRING);
    next();
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).send("Database connection failed");
  }
});

app.use("/", router);
app.use("/", userRoutes);
app.use("/feed", feedRoutes);

// Export the Express app for Vercel serverless function
export default app;
