import express from "express";
import { userController } from "../../src/controllers/userController.js";

export const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
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

router.post("/register", (req, res) => {
  userController.registerUser(req, res);
});
