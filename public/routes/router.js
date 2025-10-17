import express from "express";
import { userController } from "../../src/controllers/userController.js";
import { feedController } from "../../src/controllers/feedController.js";

export const router = express.Router();

router.get("/", (req, res) => {
  res.render("feed", { title: "Feed" });
});

router.get("/feed", (req, res) => {
  res.render("feed", { title: "Feed" });
});

router.post("/feed", (req, res) => {
  feedController.createPost(req, res);
});

router.get("/feed", (req, res) => {
  feedController.getPosts(req, res);
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.post("/login", (req, res) => {
  userController.loginUser(req, res);
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

router.post("/register", async (req, res) => {
  try {
    await userController.registerUser(req, res);
  } catch (error) {
    res.status(500).send("Error registering user", error.message);
  }
});
