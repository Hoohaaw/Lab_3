class Feed {
  constructor() {}

  postEventTrigger() {
    const postButton = document.getElementById("postButton");
    postButton.addEventListener("click", async (e) => {
      e.preventDefault();

      const newPostContent = document.getElementById("newPostContent").value;
      console.log("User wrote:", newPostContent);

      if (!newPostContent.trim()) {
        alert("Post cannot be empty!");
        return;
      }

      try {
        const response = await fetch("/feed/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "testuser", // later replace with real session user
            content: newPostContent,
          }),
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(errText);
        }

        const result = await response.json();
        console.log("Post created successfully:", result);
      } catch (err) {
        console.error("Failed to create post:", err.message);
      }
    });
  }
}

const feed = new Feed();
window.addEventListener("DOMContentLoaded", () => feed.postEventTrigger());
