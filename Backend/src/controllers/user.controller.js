const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

/**
 * @route POST /api/users/follow/:username
 * @description create an entry of follower and followee data
 * @access private/public  
 * 
 */
async function followUserController(req,res){
    // console.log(req.user)
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;
    if (followeeUsername == followerUsername){
        return res.status(400).json({
            message:"You cannot follow yourself"
        })
    };

    const isFolloweeExists = await userModel.findOne(
        { username:followeeUsername}
    );
    if(!isFolloweeExists){
        return res.status(404).json({
            message:`user you trying to follow doesn't exists`
        })
    }
    const isFollowingAlready = await followModel.findOne({
        follower : followerUsername,
        followee : followeeUsername
    });
    if(isFollowingAlready){
        return res.status(200).json({
            message:`you already follow this ${followeeUsername}`,
            follow: isFollowingAlready
        })
    }
    const followRecord = await followModel.create({
        follower:followerUsername,
        followee:followeeUsername
    });

    res.status(201).json({
        message:`you are now following ${followeeUsername}`,
       follow: followRecord
    })
}
/**
 * @route DELETE /api/users/unfollow/:username
 * @description unfollown an user and delete an entry from db
 * @access private
 * 
 */

async function unFollowUserController(req,res){
     const followerUsername = req.user.username;
     const followeeUsername = req.params.username;

     const following = await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
     });
     if(!following){
        return res.status(404).json({
            message:`the user does not follow ${followeeUsername}`
        })
     }
     await followModel.findByIdAndDelete(following._id);
     res.status(200).json({
        message:`user unfollowed the ${followeeUsername}`,
     })
}
module.exports ={
    followUserController,
    unFollowUserController
}