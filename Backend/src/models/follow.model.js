const mongoose = require("mongoose");
const followSchema = new mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"follower id is required"]
    },
    followee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"followee id is required"]
    }
},{
    timestamps :true        // timestamp true means the time at which the document is created..
});
const followModel = mongoose.model('follows',followSchema);
module.exports = followModel; 