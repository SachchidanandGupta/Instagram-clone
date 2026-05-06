const express = require("express");

const postRouter = express.Router();

const postController = require("../controllers/post.controller");

const identifyUser = require("../middlewares/auth.middleware");

const multer = require("multer");

const upload = multer({storage:multer.memoryStorage()});
/**
 * @route  POST /api/posts/ 
 * @description to upload image
 */

postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController);

/**
 * @route GET /api/posts/
 * @description t get postid; 
 */

postRouter.get("/",identifyUser,postController.getPostController);
/**
 * @route POST /api/posts/details/:postId
 * @description to get the post details
 */

postRouter.get("/details/:postId",identifyUser,postController.getPostDetailsController);

/**
 * @route /api/posts/like/:postId
 * @description post likes data
 */

postRouter.post("/like/:postId",identifyUser,postController.likePostController);
postRouter.post("/unlike/:postId",identifyUser,postController.unLikePostController);

/**
 * @route GET /api/post/feed
 * @description to get the feed
 * @access private * 
 */

postRouter.get("/feed",identifyUser,postController.getFeedController);

module.exports = postRouter;