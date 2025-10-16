import "dotenv/config";
import express from "express";
import { fileURLToPath } from "url";
import { connectToDatabase } from "../public/config/mongoose.js";
import { router } from "../public/routes/router.js";

try {
  const app = express();

  // Serve static files
  const publicDir = fileURLToPath(new URL("../public", import.meta.url));
  app.use(express.static(publicDir));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // View engine setup (EJS)
  app.set("view engine", "ejs");
  const viewsDir = fileURLToPath(new URL("../views", import.meta.url));
  app.set("views", viewsDir);

  app.use("/", router);

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));

} catch (err) {
  console.error(err);
  process.exit(1);
}
