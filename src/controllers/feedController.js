import { Post } from "../models/Post.js";
class FeedController {
  async createPost(req, res) { // Create a new post
    const { username, content } = req.body;
    if (content && content.trim().length > 1) {
      await Post.create({ username, content });
      res.send("Create post");
    } else {
      res.status(400).send("Cant post an empty post");
    }
  }
  async getPosts(req, res,) { // Get all posts
    res.send("Get posts");
    const posts = await Post.find();

  }
  deletePost(req, res, next, id) { // delete a post
    res.send("Delete post");
    Post.findByIdAndDelete(id);
  }
}

export const feedController = new FeedController();
