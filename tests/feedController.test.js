import { feedController } from "../src/controllers/feedController";
import Post from "../public/models/postModel.js";
import User from "../public/models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const mongoConnectionString = process.env.DB_CONNECTION_STRING;
beforeAll(async () => {
  await mongoose.connect(mongoConnectionString);
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("Check if JWT token is present - no token", () => {
  const req = { cookies: {} };
  const decoded = feedController.checkIfTokenIsPresent(req);
  expect(decoded).toBeNull();
});

test("Check if JWT token is present - valid token", () => {
  const req = {
    cookies: {
      authToken: jwt.sign({ userId: "12345" }, process.env.JWT_SECRET)
    }
  };
  const decoded = feedController.checkIfTokenIsPresent(req);
  expect(decoded).toHaveProperty("userId", "12345");
});

test("Get all posts from last 48 hours", async () => {
  const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
  const posts = await Post.find({
    createdAt: { $gte: fortyEightHoursAgo }}).sort({ createdAt: -1 }).lean();
  expect(posts).toBeDefined();
});
