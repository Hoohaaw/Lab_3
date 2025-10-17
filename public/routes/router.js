import express from "express";

export const router = express.Router();

router.get("/", (req, res) => {
  res.render("feed", { title: "Feed" });
});

router.get("/feed", (req, res) => {
  res.render("feed", { title: "Feed" });
});
