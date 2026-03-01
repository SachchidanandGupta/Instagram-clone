const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");

const ImageKit = require("@imagekit/nodejs");

const { toFile } = require("@imagekit/nodejs");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

/**
 * multer uses two types of storage disk and memory storage the disk storage means the files are being saved locally(on server)  
 * so we use memory storage most of the time which stores data in RAM and is temporary
 */

/**
 * @route /api/posts/ 
 * @description Image upload on imagekit.io
 * @access private
 * 
 */
async function createPostController(req, res) {
 console.log(req.file);
  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
    folder: "Cohort-2-Insta-posts",
  });
  
  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });
  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

/**
 * @route GET -->  /api/posts/   
 * @description get post data
 * @access Public
 */
async function getPostController(req, res) {
 

  const userId = req.user.id;
  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "User post fetched successfully.",
    posts,
  });
}

/**
 * @route GET /api/posts/details/:postId
 * @description to fetch userrs posts
 * @access private
 */
async function getPostDetailsController(req, res) {
 

  const userId = req.user.id;

  const postId = req.params.postId;

  const posts = await postModel.findById(postId);
  if (!posts) {
    return res.status(404).json({
      message: "Post  not founded.",
    });
  }

  const isValidUser = posts.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden content.",
    });
  }

  return res.status(200).json({
    message: "Post fetched successfully.",
    posts,
  });
}


/**
 * @route POST /api/posts/like?:postId
 * @description to lke a post
 */
async function likePostController(req,res){
    const postId = req.params.postId;
    const likedUser = req.user.username;
    console.log(postId,likedUser);

    const isAlreadyLiked = await likeModel.findOne({
      postLiked:postId,
      likedBy:likedUser
    });
    if(isAlreadyLiked){
      return res.status(200).json({
        message:`the post is already liked by ${likedUser}`,
        isAlreadyLiked
      })
    }
    const isPostExists = await postModel.findById(postId);
    if(!isPostExists){
      return res.status(404).json({
        message:"Post  not founded."
      })
    }
    const like = await likeModel.create({
        postLiked:postId,
        likedBy : likedUser 
    });
    res.status(201).json({
        message:`the post is liked by ${likedUser}`,
        like
    })
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController
};
