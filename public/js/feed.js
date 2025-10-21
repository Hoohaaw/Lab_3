class Feed {
  constructor() {
    this.feedContainer = document.getElementById("feedContainer");
    this.postsContainer = document.getElementById("postsContainer");
    this.template = document.getElementById("postTemplate");
    this.loadUsername();
  }

  loadUsername() {
    const username = this.getCookie("username");
    const headerUsername = document.getElementById("headerUsername");
    if (headerUsername && username) {
      headerUsername.textContent = `Logged in as, ${username}`;
    }
  }

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
    return null;
  }

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

  checkEmptyContent(content) {
    if (!content) {
      alert("Post cannot be empty!");
      return false;
    } else {
      return true;
    }
  }

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

  renderPosts(posts) {
    this.postsContainer.innerHTML = "";
    posts.forEach(post => this.prependPost(post, false));
  }

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

const feed = new Feed();
window.addEventListener("DOMContentLoaded", () => {
  feed.postEventTrigger();
  feed.loadPosts();
});
