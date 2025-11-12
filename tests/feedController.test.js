import dotenv from "dotenv";
dotenv.config();

import { feedController } from "../src/controllers/feedController";
import Post from "../public/models/postModel.js";
import User from "../public/models/userModel.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const mongoConnectionString = process.env.DB_CONNECTION_STRING;
beforeAll(async () => {
  await mongoose.connect(mongoConnectionString);
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("Check if JWT token is present - no token", async () => {
  const req = { cookies: {} };
  const decoded = await feedController.checkIfTokenIsPresent(req);
  expect(decoded).toBeNull();
});

test("Check if JWT token is present - valid token", async () => {
  const req = {
    cookies: {
      authToken: jwt.sign({ userId: "12345" }, process.env.JWT_SECRET)
    }
  };
  const decoded = await feedController.checkIfTokenIsPresent(req);
  expect(decoded).toHaveProperty("userId", "12345");
});

test("Check if JWT token is present - invalid token", async () => {
  const req = {
    cookies: {
      authToken: "invalid.token.here"
    }
  };
  const decoded = await feedController.checkIfTokenIsPresent(req);
  expect(decoded).toBeNull();
});

test("Check if JWT token is present - expired token", async () => {
  const expiredToken = jwt.sign(
    { userId: "12345" },
    process.env.JWT_SECRET,
    { expiresIn: "0s" }
  );
  const req = {
    cookies: {
      authToken: expiredToken
    }
  };
  const decoded = await feedController.checkIfTokenIsPresent(req);
  expect(decoded).toBeNull();
});

test("Check if JWT token is present - token with wrong secret", async () => {
  const req = {
    cookies: {
      authToken: jwt.sign({ userId: "12345" }, "wrong-secret")
    }
  };
  const decoded = await feedController.checkIfTokenIsPresent(req);
  expect(decoded).toBeNull();
});

test("Get all posts from last 48 hours", async () => {
  const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
  const posts = await Post.find({
    createdAt: { $gte: fortyEightHoursAgo }}).sort({ createdAt: -1 }).lean();
  expect(posts).toBeDefined();
});
