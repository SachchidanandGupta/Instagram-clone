const jwt = require("jsonwebtoken");

const postModel = require("../models/post.model");

const bcrypt = require('bcryptjs');

const multer = require("multer"); 

async function createPostController(req,res){
   
    console.log(req.body);
    
}
module.exports ={
    createPostController
}