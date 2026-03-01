const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

/**
 * @route POST /api/users/follow/:username
 * @description create an entry of follower and followee data
 * @access private/public
 *
 */
async function followUserController(req, res) {
  // console.log(req.user)
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;
  if (followeeUsername == followerUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const isFolloweeExists = await userModel.findOne({
    username: followeeUsername,
  });
  if (!isFolloweeExists) {
    return res.status(404).json({
      message: `user you trying to follow doesn't exists`,
    });
  }
  const isFollowingAlready = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });
  if (isFollowingAlready) {
    return res.status(200).json({
      message: `you already follow this ${followeeUsername}`,
      follow: isFollowingAlready,
    });
  }
  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(201).json({
    message: `you are now following ${followeeUsername}`,
    follow: followRecord,
  });
}
/**
 * @route DELETE /api/users/unfollow/:username
 * @description unfollown an user and delete an entry from db
 * @access private
 *
 */

async function unFollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const following = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });
  if (!following) {
    return res.status(404).json({
      message: `the user does not follow ${followeeUsername}`,
    });
  }
  await followModel.findByIdAndDelete(following._id);
  res.status(200).json({
    message: `user unfollowed the ${followeeUsername}`,
  });
}

/**
 * @route POST /api/users/follow-request/:username
 * @description send follow requests
 */
async function followRequestController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followeeUsername === followerUsername) {
    return res.status(400).json({
      message: "you cannot send follow request to yourself",
    });
  }

  const followee = await userModel.findOne({
    username: followeeUsername,
  });

  if (!followee) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  const isRequestMade = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isRequestMade) {
    return res.status(200).json({
      message: "Request already exists",
      follow: isRequestMade,
    });
  }


  const status = followee.isPrivate ? "pending" : "accepted";

  const request = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
    status: status,
  });

  res.status(201).json({
    message: status === "pending" ? "Follow request sent" : "Now following",
    follow: request,
  });
}

/**
 * @route POST /api/user/follow-request/accept
 * @description to accept an follow request
 */
async function acceptRequestController(req, res) {
  const followeeUsername = req.user.username;
  const followerUsername = req.params.username;

  const request = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
    status: "pending",
  });

  if (!request) {
    return res.status(404).json({
      message: "Follow request not found",
    });
  }

  request.status = "accepted";

  await request.save();

  res.status(200).json({
    message: `${followerUsername} is now following you`,
    follow: request,
  });
}

/**
 * @route POST /api/user/follow-request/rejected
 * @description to decline an follow request
 */
async function declineRequestController(req, res) {
  const followeeUsername = req.user.username;
  const followerUsername = req.params.username;

  const request = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
    status: "pending",
  });

  if (!request) {
    return res.status(404).json({
      message: "Follow request not found",
    });
  }

  request.status = "rejected";

  await request.save();

  res.status(200).json({
    message: "Follow request rejected",
  });
}

/**
 * @route GET /api/user/ 
 * @description to get the pending requests
 */

async function getRequestController(req, res) {
  const username = req.user.username;

  const requests = await followModel.find({
    followee: username,
    status: "pending",
  });

  res.status(200).json({
    requests,
  });
}
module.exports = {
  followUserController,
  unFollowUserController,
  followRequestController,
  getRequestController,
  acceptRequestController,
  declineRequestController,
};
