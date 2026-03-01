const express = require("express");

const userRouter = express.Router();

const userController = require("../controllers/user.controller");

const identifyUser = require("../middlewares/auth.middleware");

/**
 *  @route POST  /api/users/follow/:username
 * @description follow user
 *  @access private
 */
userRouter.post("/follow/:username",identifyUser, userController.followUserController);

/**
 * @route DELETE /api/users/unfollow/:username
 * @description unfollow user
 * @access private
 * 
 */
userRouter.post("/unfollow/:username",identifyUser,userController.unFollowUserController);


module.exports = userRouter;
