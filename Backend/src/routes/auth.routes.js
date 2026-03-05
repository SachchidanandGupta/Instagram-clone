const express = require("express");

const authRouter = express.Router();

const authController = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware");
/**
 * @route POST  /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post("/register", authController.registerController );


/**
 * @route POST /api/auth/login
 * @description Login an existing user
 * @access Private
 */

authRouter.post("/login",authController.loginController);


/**
 * @route GET /api/auth/get-me
 * @description Get the data of an existing user
 * @access Private
 */
authRouter.get("/get-me",identifyUser, authController.getMeController);

module.exports = authRouter;