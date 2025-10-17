import Post from "../../public/models/postModel.js";
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
  async getPosts(req, res) {
    try {
      const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

      const posts = await Post.find({
        createdAt: { $gte: fortyEightHoursAgo }
      }).sort({ createdAt: -1 });

      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching posts");
    }
  }

  deletePost(req, res, next, id) { // delete a post
    res.send("Delete post");
    Post.findByIdAndDelete(id);
  }
}

export const feedController = new FeedController();
