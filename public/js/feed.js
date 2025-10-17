import FeedController from "./feedController.js";

class Feed {
  constructor() {
    this.controller = new FeedController();
  }

  postEventTrigger() {
    const postButton = document.getElementById("postButton");
    postButton.addEventListener("click", async (e) => {
      e.preventDefault();
      const newPostContent = document.getElementById("newPostContent").value;
      console.log(newPostContent); // testing
      this.createPost(newPostContent);
    });
  }

  async createPost(content) {
    try {
      const result = await this.controller.createPost(content);
      console.log("Post created:", result); // testing
    } catch (err) {
      console.error(err);
    }
  }
}

const feed = new Feed();
window.addEventListener("DOMContentLoaded", () => feed.postEventTrigger());

export default Feed;
