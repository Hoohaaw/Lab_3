import "dotenv/config";
import express from "express";
import { connectToDatabase } from "../public/config/mongoose.js";
import { router } from "../public/routes/router.js";

try {
  const mongooseInstance = await connectToDatabase(process.env.DB_CONNECTION_STRING);
  const app = express();

  app.use("/", router);

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));

} catch (err) {
  console.error(err);
  process.exit(1);
}
