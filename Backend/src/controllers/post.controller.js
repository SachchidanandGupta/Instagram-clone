const jwt = require("jsonwebtoken");

const postModel = require("../models/post.model");

const bcrypt = require('bcryptjs');

const ImageKit = require("@imagekit/nodejs");

const {toFile} = require("@imagekit/nodejs");

const imageKit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})


//multer uses two types of storage disk and memory storage the disk storage means the files are being saved locally(on server) so we use memory storage most of the time which stores data in RAM and is temporary

async function createPostController(req,res){
   
    console.log(req.body,req.file);
    
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Token not provided, unauthorized access."
        })
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    const file = await imageKit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"test"
    })
    console.log(decoded);
    const post = await postModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:decoded.id
    });
    res.status(201).json({
        message:"Post created successfully",
        post
    })
}
module.exports ={
    createPostController
}