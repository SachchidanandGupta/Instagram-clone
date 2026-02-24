const jwt = require("jsonwebtoken");

const postModel = require("../models/post.model");

const bcrypt = require("bcryptjs");

const ImageKit = require("@imagekit/nodejs");

const { toFile } = require("@imagekit/nodejs");
const userModel = require("../models/user.model");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

//multer uses two types of storage disk and memory storage the disk storage means the files are being saved locally(on server) so we use memory storage most of the time which stores data in RAM and is temporary

async function createPostController(req, res) {
  console.log(req.body, req.file);

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided, unauthorized access.",
    });
  }
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "user not found UnAuthourized access. ",
    });
  }

  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
    folder: "Cohort-2-Insta-posts",
  });
  console.log(decoded);
  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decoded.id,
  });
  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

async function getPostController(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access.",
    });
  }
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: " not an Authorized user. ",
    });
  }

  const userId = decoded.id;
  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "User post fetched successfully.",
    posts,
  });
}

async function getPostDetailsController(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access.",
    });
  }
  let decoded = null;
  try{
    decoded = jwt.verify(token,process.env.JWT_SECRET);
  }catch(err){
    return res.status(401).json({
      message:"Invalid token! "
    })
  }

  const userId = decoded.id;

  const postId = req.params.postId;

  const posts = await postModel.findById(postId);
  if(!posts){
    return res.status(404).json({
      message:"Post  not founded."
    })
  }

  const isValidUser = posts.user.toString() === userId;

  if(!isValidUser){
    return res.status(403).json({
      message:"Forbidden content."
    })
  };

  return res.status(200).json({
    message:"Post fetched successfully.",
    posts
  })

}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
};
