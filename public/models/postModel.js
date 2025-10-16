import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;
