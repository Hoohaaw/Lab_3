import { get } from "mongoose";
import Post from "../../public/models/postModel.js";
import User from "../../public/models/userModel.js";
import jwt from "jsonwebtoken";
class FeedController {
  async handleCreatePost(req, res) { // create a post
    const decoded = this.checkIfTokenIsPresent(req);
    if (!decoded) {return res.status(401).json({ error: "Unauthorized" });}

    const userId = decoded.userId;
    const user = await User.findById(userId);
    if (!user) {return res.status(401).json({ error: "User not found" });}

    const { content } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ error: "Post cannot be empty" });
    }

    return this.createPost(req, res, userId, content, user);
  }

  checkIfTokenIsPresent(req) { // verify JWT token
    const token = req.cookies.authToken;
    if (!token) {return null;}
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return null;
    }
  }

  async createPost(req, res, userId, content, user) { // create a post
    console.log("Creating post with:", { userId, user, content });
    await Post.createPost(userId, user, content)
      .then(post => res.status(201).json(post));
  }

  async getPosts(req, res) { // Get posts from last 48 hours
    await Post.getPostsFromLast48Hours()
      .then(posts => res.status(200).json(posts));
  }

  async deletePost(req, res, next, id) { // delete a post
    res.send("Delete post");
    await Post.findByIdAndDelete(id);
  }

  async updateLikeCount(req, res) { // Update like count
    const { id } = req.body;
    const updatedPost = await Post.likePost(id);
    res.json({ message: "Like count updated", post: updatedPost });
  }
}

export const feedController = new FeedController();
