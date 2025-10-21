import mongoose from "mongoose";
let cachedConnection = null;

export const connectToDatabase = async (connectionString) => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  const connection = await declareMongooseOptions();
  connection.on("connected", () => console.log("Mongoose connected to MongoDB."));
  connection.on("error", (err) => console.error(`Mongoose connection error: ${err}`));
  connection.on("disconnected", () => console.log("Mongoose disconnected from MongoDB."));
  signalEvent(connection);

  cachedConnection = await mongoose.connect(connectionString);
  return cachedConnection;
};

async function declareMongooseOptions() {
  const { connection } = mongoose;
  mongoose.set("strict", "throw");
  mongoose.set("strictQuery", true);
  return connection;
}

function signalEvent(connection) {
  for (const signalEvent of ["SIGINT", "SIGTERM"]) {
    process.on(signalEvent, () => {
      (async () => {
        await closeConnection(connection, signalEvent);
      })();
    });
  }
}

async function closeConnection(connection, signalEvent) {
  await connection.close();
  console.log(`Mongoose disconnected from MongoDB through ${signalEvent}.`);
  process.exit(0);
};
