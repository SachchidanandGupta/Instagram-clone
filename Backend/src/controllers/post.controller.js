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
    const file = await imageKit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"test"
    })
    res.send(file);
}
module.exports ={
    createPostController
}