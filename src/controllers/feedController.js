import { Post } from "../models/Post.js";
class FeedController {
  createPost(req, res) { // Create a new post
    res.send("Create post");
    const { username, content } = req.body;
    Post.create({ username, content });
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
