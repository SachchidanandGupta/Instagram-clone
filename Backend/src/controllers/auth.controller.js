const userModel = require("../models/user.model");

const crypto = require("crypto");

const jwt = require("jsonwebtoken");

async function registerController (req, res)  {
  const { username, email, password, bio, profileImage } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserExists) {
    return res.status(409).json({
      message:
        "user already exists." + (isUserExists.email == email
          ? "email already in use"
          : "username already exists")
    });
  }
  const user = await userModel.create({
    username,
    email,
    password: crypto.createHash("md5").update(password).digest("hex"),
    bio,
    profileImage,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User data stored in database successfully.",
    user:{
      username:user.username,
      email:user.email,
      bio:user.bio,
      profileImage:user.profileImage
    },
    token,
  });

}



async function loginController(req,res){
  const { username , email ,password} = req.body;

  const user = await userModel.findOne({
      $or:[
         {
            username: username
         },{
          email: email
         }
      ]
  })

  if(!user){
    return res.status(404).json({
      message:"User not founded."
    })
  }
  
  const hash = crypto.createHash("md5").update(password).digest("hex");
  
  const isPasswordValid = hash == user.password;

  if(!isPasswordValid){
    return res.status(201).json({
      message:"Invalid Password."
    })
  }
  const token = jwt.sign({
    id:user._id
  },process.env.JWT_SECRET,{expiresIn:"1d"});

  res.cookie("token",token);

  res.status(200).json({
    message:"User Logged in successfully",
    user:
     { username : user.username,
      email :user.email,
      bio: user.bio,
      profileImage: user.profileImage
    }


    
  })


}

module.exports = {
    registerController,
    loginController
}