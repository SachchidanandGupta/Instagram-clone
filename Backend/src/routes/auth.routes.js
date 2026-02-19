const express = require("express");

const authRouter = express.Router();

const userModel = require("../models/user.model");

const crypto = require("crypto");

const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
  const { username, email, password, bio, profileImage } = req.body;

  const isEmailExists = await userModel.findOne({ email });

  if (isEmailExists) {
    return res.status(409).json({
      message: "Email address already in use.",
    });
  }
  const isUserUnique = await userModel.findOne({ username });

  if (isUserUnique) {
    return res.status(409).json({
      message: "username exists please try some variation.",
    });
  }
  const user = await userModel.create({
    username,
    email,
    password: crypto.createHash("md5").update(password).digest("hex"),
    bio,
    profileImage,
  });

  const token = jwt.sign({
   id:user._id,
   

  },process.env.JWT_SECERET,{expiresIn:"1h"});

  res.cookie("token",token);

  res.status(201).json({
    message: "User data stored in database successfully.",
    user,
    token
  });
});

module.exports = authRouter;
