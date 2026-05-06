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
async function likePostController(req, res) {
  const postId = req.params.postId;
  const likedUser = req.user.username;
  console.log(postId, likedUser);

  const isAlreadyLiked = await likeModel.findOne({
    postLiked: postId,
    likedBy: likedUser,
  });
  if (isAlreadyLiked) {
    return res.status(200).json({
      message: `the post is already liked by ${likedUser}`,
      isAlreadyLiked,
    });
  }
  const isPostExists = await postModel.findById(postId);
  if (!isPostExists) {
    return res.status(404).json({
      message: "Post  not founded.",
    });
  }
  const like = await likeModel.create({
    postLiked: postId,
    likedBy: likedUser,
  });
  res.status(201).json({
    message: `the post is liked by ${likedUser}`,
    like,
  });
}

async function unLikePostController(req,res){
  const postId = req.params.postId;
  const username = req.user.username;
  const isLIked = await likeModel.findOne({
     postLiked:postId,
     likedBy:username
  })
  if(!isLIked){
    return res.status(400).json({
      message: `the post isn't liked by${username}`
    })
  }
  await likeModel.findOneAndDelete({_id:isLiked._id});
  return res.status(200).json({
    message:"Post unliked successfully"
  })
}
async function getFeedController(req, res) {
  const user = req.user;
  const posts = await Promise.all(
    (await postModel.find().sort({_id:-1}).populate("user").lean()).map(async (post) => {
      /**
       * typeof post = mongoose object :- the data is readed into mongoose object and a new property can't be added into it
       * to change them into regular object we use lean function
       * sort({_id:-1}) is used to return the data on frontend on the time basis the post created at the moment will show at the top
       */
      
      const isLiked = await likeModel.findOne({
        postLiked: post._id,
        likedBy: user.username,
      });
      
      post.isLiked = !!isLiked; // Convert to boolean: true if liked, false otherwise
      return post;
    }),
  );
  // promise all will resolve all the promises which has been sent into pending by map function
  res.status(200).json({
    message: "Posts fetched successfully",
    posts,
  });
}
module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  unLikePostController,
  getFeedController,
};
