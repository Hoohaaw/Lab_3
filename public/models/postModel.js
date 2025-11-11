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

    if (!updatedPost) {
      throw new Error("Post not found");
    }
    return updatedPost;
  } catch (err) {
    console.error("Error updating like count:", err);
    throw err;
  }
};

const Post = mongoose.model("Post", postSchema);

export default Post;
