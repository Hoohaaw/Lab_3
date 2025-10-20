import express from "express";
import { feedController } from "../../src/controllers/feedController.js";
import { requireAuth } from "../../src/middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", requireAuth, (req, res) => feedController.createPost(req, res));
router.get("/", requireAuth, (req, res) => feedController.getPosts(req, res));

export default router;
