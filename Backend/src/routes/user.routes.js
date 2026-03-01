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

/**
 * @route /api/user/follow/status/:username
 * @description checcks the follow status
 */
userRouter.post("/follow-request/:username",identifyUser,userController.followRequestController);

userRouter.get("/follow-request",identifyUser,userController.getRequestController);

userRouter.post("/follow-request/accept",identifyUser,userController.acceptRequestController);

userRouter.post("/follow-request/rejected",identifyUser,userController.declineRequestController);


module.exports = userRouter;
