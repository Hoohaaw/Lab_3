class FeedController {
  createPost(req, res) {
    res.send("Create post");
  }
  getPosts(req, res) {
    res.send("Get posts");
  }
  deletePost(req, res) {
    res.send("Delete post");
  }

}

export const feedController = new FeedController();
