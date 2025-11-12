import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

userSchema.statics.createUser = async function (username, password) {
  const newUser = await this.create({ username, password });
  return newUser;
};

userSchema.statics.findByUsername = async function (username) {
  return await this.findOne({ username });
};

userSchema.statics.findByCredentials = async function (username, password) {
  const user = await this.findOne({ username, password });
  if (!user) {
    throw new Error("Invalid username or password");
  }
  return user;
};

userSchema.statics.deleteUserById = async function (userId) {
  const deletedUser = await this.findByIdAndDelete(userId);
  if (!deletedUser) {
    throw new Error("User not found");
  }
  return deletedUser;
};

const User = mongoose.model("User", userSchema);

export default User;
