const mongoose = require("mongoose");
const likeSchema =new mongoose.Schema({
    postLiked:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts",
        required:[true,"PostID is required for post"]
    },
    likedBy:{
        type:String,
        ref:"users",
        required:[true,"user is required for post likes"]
    }  
},{timestamps:true});

likeSchema.index({postLiked:1,likedBy:1},{unique:true})

const likeModel = mongoose.model("likes",likeSchema);

module.exports = likeModel