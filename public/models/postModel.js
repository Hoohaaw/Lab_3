import mongoose from "mongoose";
import User from "./userModel.js";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
}, { timestamps: true });

postSchema.statics.likePost = async function (postId) {
  try {
    const updatedPost = await this.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } },
      { new: true }
    );

    return updatedPost;
  } catch (err) {
    console.error("Error updating like count:", err);
    throw err;
  }
};

postSchema.statics.getPostsFromLast48Hours = async function () {
  try {
    const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
    return this.find({ createdAt: { $gte: fortyEightHoursAgo } }).sort({ createdAt: -1 }).lean();

  } catch (error) {
    console.error("Error fetching posts from last 48 hours:", error);
    throw error;
  }
};

postSchema.statics.createPost = async function (userId, user, content) {
  try {
    const newPost = await this.create({
      author: userId,
      username: user.username,
      content
    });
    return newPost;
  } catch (err) {
    console.error("Error creating post:", err);
    throw err;
  }
};

postSchema.statics.checkJwtToken = function (token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
const Post = mongoose.model("Post", postSchema);

export default Post;
