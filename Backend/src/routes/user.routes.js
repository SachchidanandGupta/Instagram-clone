const express = require("express");

const userRouter = express.Router();

const userController = require("../controllers/user.controller");

const identifyUser = require("../middlewares/auth.middleware");

/**
 *  @route POST  /api/users/follow/:userId
 * @description follow user
 *  @access private
 */
userRouter.post("/follow/:userId",identifyUser, userController.followUserController);

module.exports = userRouter;
