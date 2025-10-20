import Post from "../../public/models/postModel.js";
class FeedController {
  async createPost(req, res) { // Create a new post
    const { username, content } = req.body;
    try {
      if (!content || !content.trim()) {
        return res.status(400).json({ error: "Post cannot be empty" });
      }

      const newPost = await Post.create({ username, content });
      return res.status(201).json(newPost);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to create post" });
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

  async updateLikeCount(req, res) { // Update like count
    try {
      const { id } = req.body.id;

      const updatedPost = await Post.findByIdAndUpdate(id,
        { $inc: { likes: 1 } },
      );

      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json({ message: "Like count updated", post: updatedPost });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

}

export const feedController = new FeedController();
