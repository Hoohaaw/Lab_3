import { userController } from "../../src/controllers/userController.js";
import express from "express";

const router = express.Router();

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

export default router;
