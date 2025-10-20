import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;
