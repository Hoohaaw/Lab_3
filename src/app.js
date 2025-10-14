import express from "express";
import { connectToDatabase } from "./config/database.js";
import { router } from "../public/routes/router.js";

try {
  await connectToDatabase(process.env.DB_CONNECTION_STRING);
  const app = express();

  app.use("/", router);

} catch (err) {
  console.error(err);
  process.exit(1);
}
