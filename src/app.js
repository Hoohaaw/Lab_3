import express from "express";

try {
  const app = express();
} catch (err) {
  console.error(err);
  process.exit(1);
}
