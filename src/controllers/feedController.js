import Post from "../../public/models/postModel.js";
import User from "../../public/models/userModel.js";
import jwt from "jsonwebtoken";
class FeedController {
  async handleCreatePost(req, res) { // create a post
    try {
      const decoded = await this.checkIfTokenIsPresent(req);
      if (!decoded) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const userId = decoded.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      const { content } = req.body;
      if (!content || !content.trim()) {
        return res.status(400).json({ error: "Post cannot be empty" });
      }

      return this.createPost(req, res, userId, content, user);
    } catch (err) {
      console.error("Error in handleCreatePost:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async checkIfTokenIsPresent(req) { // verify JWT token
    const token = req.cookies.authToken;
    return await Post.checkJwtToken(token);
  }

  async createPost(req, res, userId, content, user) { // create a post
    console.log("Creating post with:", { userId, user, content });
    try {
      const newPost = await Post.createPost(userId, user, content);
      return res.status(201).json(newPost);
    } catch (err) {
      console.error("Error creating post:", err);
      return res.status(500).json({ error: "Failed to create post" });
    }
  }

  async getPosts(req, res) { // Get posts from last 48 hours
    try {
      const posts = await Post.getPostsFromLast48Hours();
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Error fetching posts" });
    }
  }

  async deletePost(req, res, next, id) { // delete a post
    res.send("Delete post");
    await Post.findByIdAndDelete(id);
  }

  async updateLikeCount(req, res) { // Update like count
    try {
      const { id } = req.body;
      const updatedPost = await Post.likePost(id);
      res.json({ message: "Like count updated", post: updatedPost });
    } catch (err) {
      console.error("Error updating like count:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
}

export const feedController = new FeedController();
