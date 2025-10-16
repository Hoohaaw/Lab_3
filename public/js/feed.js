import feedController from "../controllers/feedController.js";
class Feed {
  constructor() {
    this.controller = new feedController();
  }

  postEventTrigger() {
    const postButton = document.getElementById("postButton");
    addEventListener("click", () => {
      const newPostContent = document.getElementById("newPostContent").value;
      console.log(newPostContent);
      this.controller.createPost(newPostContent);
    });
  }
}

exports = Feed;
