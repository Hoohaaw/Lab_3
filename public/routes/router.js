import express from "express";
import { requireAuth } from "../../src/middlewares/authMiddleware.js";

export const router = express.Router();

router.get("/", requireAuth, (req, res) => {
  res.render("feed", { title: "Feed" });
});

router.get("/feed", requireAuth, (req, res) => {
  res.render("feed", { title: "Feed" });
});
