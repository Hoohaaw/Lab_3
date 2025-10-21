import { userController } from "../../src/controllers/userController.js";
import { redirectIfAuth } from "../../src/middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.get("/login", redirectIfAuth, (req, res) => {
  res.render("login", { title: "Login" });
});

router.post("/login", (req, res) => {
  userController.loginUser(req, res);
});

router.get("/register", redirectIfAuth, (req, res) => {
  res.render("register", { title: "Register" });
});

router.post("/register", async (req, res) => {
  try {
    await userController.registerUser(req, res);
  } catch (error) {
    res.status(500).send("Error registering user", error.message);
  }
});

router.post("/validate-password", (req, res) => {
  userController.validatePasswordOnly(req, res);
});

router.get("/logout", (req, res) => {
  // Clear both cookies to fully log out
  res.clearCookie("username");
  res.clearCookie("authToken");
  res.redirect("/login");
});

export default router;
