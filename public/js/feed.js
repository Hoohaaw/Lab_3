class Feed {
  constructor() {
    this.feedContainer = document.getElementById("feedContainer");
    this.postsContainer = document.getElementById("postsContainer");
    this.template = document.getElementById("postTemplate");
  }

  // Trigger for creating a new post
  postEventTrigger() {
    const postButton = document.getElementById("postButton");
    postButton.addEventListener("click", async (e) => {
      e.preventDefault();

      const newPostContent = document.getElementById("newPostContent").value.trim();
      if (!this.checkEmptyContent(newPostContent)) {return;}

      const newPost = await this.createPost(newPostContent);
      this.prependPost(newPost);
      document.getElementById("newPostContent").value = "";
    });
  }

  // Check for empty post content
  checkEmptyContent(content) {
    if (!content) {
      alert("Post cannot be empty!");
      return false;
    } else {
      return true;
    }
  }

  // Create a new post
  async createPost(content) {
    try {
      const response = await fetch("/feed/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }

      return await response.json();
    } catch (err) {
      console.error("Failed to create post:", err.message);
      alert("Failed to create post. Try again.");
    }
  }

  // Load posts from database
  async loadPosts() {
    try {
      const response = await fetch("/feed/posts");
      if (!response.ok) {throw new Error("Failed to fetch posts");}
      const posts = await response.json();
      this.renderPosts(posts);
    } catch (err) {
      console.error(err);
      this.postsContainer.innerHTML = "<p>Failed to load posts.</p>";
    }
  }

  // Render posts from database
  renderPosts(posts) {
    this.postsContainer.innerHTML = "";
    posts.forEach(post => this.prependPost(post, false));
  }

  // Prepend a post to the feed
  prependPost(post, toTop = true) {
    const postDiv = this.template.cloneNode(true);
    postDiv.id = "";
    postDiv.style.display = "block";

    postDiv.querySelector(".postUsername").textContent = post.username || "Anonymous";
    postDiv.querySelector(".postTimestamp").textContent = new Date(post.createdAt).toLocaleString();
    postDiv.querySelector(".postContent").textContent = post.content || "";
    postDiv.querySelector(".likeCount").textContent = post.likes || 0;

    const likeButton = postDiv.querySelector(".likeButton");
    likeButton.addEventListener("click", () => {
      this.likePost(post._id, likeButton);
    });

    if (toTop) {
      this.postsContainer.prepend(postDiv);
    } else {
      this.postsContainer.appendChild(postDiv);
    }
  }

  // Like a post
  async likePost(postId, button) {
    try {
      const response = await fetch("/feed/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: postId }),
      });

      if (!response.ok) {throw new Error(await response.text());}
      const result = await response.json();

      const likeCountSpan = button.parentElement.querySelector(".likeCount");
      if (likeCountSpan) {
        likeCountSpan.textContent = result.post.likes;
      }
    } catch (err) {
      console.error("Error liking post:", err);
      alert(err.message || "Failed to like post");
    }
  }
}

// Initializing feed
const feed = new Feed();
window.addEventListener("DOMContentLoaded", () => {
  feed.postEventTrigger();
  feed.loadPosts();
});
