import "dotenv/config";
import express from "express";
import { fileURLToPath } from "url";
import { connectToDatabase } from "../public/config/mongoose.js";
import { router } from "../public/routes/router.js";
import feedRoutes from "../public/routes/feedRoutes.js";
import userRoutes from "../public/routes/userRoutes.js";
import cookieParser from "cookie-parser";

try {
  await connectToDatabase(process.env.DB_CONNECTION_STRING);

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

  app.use("/", router);
  app.use("/login", userRoutes);
  app.use("/register", userRoutes);
  app.use("/feed", feedRoutes);

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));

} catch (err) {
  console.error(err);
  process.exit(1);
}
