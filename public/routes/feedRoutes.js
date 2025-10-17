import express from "express";
import { feedController } from "../../src/controllers/feedController.js";

const router = express.Router();

router.post("/create", (req, res) => feedController.createPost(req, res));
router.get("/", (req, res) => feedController.getPosts(req, res));

export default router;
