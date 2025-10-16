import "dotenv/config";
import express from "express";
import { connectToDatabase } from "../public/config/mongoose.js";
import { router } from "../public/routes/router.js";

try {
  const mongooseInstance = await connectToDatabase(process.env.DB_CONNECTION_STRING);
  const app = express();

  // Health route to quickly check DB connection
  app.get("/health", (req, res) => {
    const state = mongooseInstance.connection.readyState; // 0 disconnected, 1 connected, 2 connecting, 3 disconnecting
    res.json({ dbState: state, ok: state === 1 });
  });

  app.use("/", router);

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));

} catch (err) {
  console.error(err);
  process.exit(1);
}
