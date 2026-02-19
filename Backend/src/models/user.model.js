const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "User already exists with this username."],
    required: [true, "Username is required."],
  },
  email: {
    type: String,
    unique: [true, "Email already in use."],
    required: [true, "Email is required."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  bio: String,
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/a4gxmhynr/default%20image.jpg",
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
