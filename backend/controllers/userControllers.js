import User from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async(req,res)=>{
    const { username, email, password, location, userType } = req.body;
    console.log(username)
    console.log(email)
    console.log(password)
    console.log(location)
    console.log(userType)

    if (!username || !email || !password) {
      throw new Error("Please fill all the fields");
    }
  
    const userExists = await User.findOne({ email });
    if (userExists) res.status(400).send("User already exists");
  
   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword, location, userType });
  
    try {
      await newUser.save();
      createToken(res, newUser._id);
  
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        location: newUser.location,
        userType: newUser.userType,
        isAdmin: newUser.isAdmin,
      });
    } catch (error) {
      res.status(400);
      throw new Error("Invalid user data");
    }

});


const userLogin = asyncHandler(async(req,res)=>{
    const{ email, password }=req.body;
     console.log(email);
    console.log(password);
    const userExists=await User.findOne({email});
  
    if(userExists)
    {
      const isPasswordValid=await bcrypt.compare(password,userExists.password);
  
      if(isPasswordValid)
      {
        createToken(res , userExists._id);
        res.status(201).json({
          _id:userExists._id,
          username:userExists.username,
          email:userExists.email,
          location:userExists.location,
          userType:userExists.userType,
          isAdmin:userExists.isAdmin,
        });
      }
      else
      {
        res.status(401).send("Invalid Password");
      }
    }
    else
    {
      res.status(401).send("User Not Found");
    }
  
  });

  const userLogOut= asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
      httpOnly:true,
      expires: new Date(0),
    });

    res.status(200).send("user LogedOut");
});

const getAllUsers= asyncHandler(async(req,res)=>{
    const allUsers= await User.find({});
  
    res.json(allUsers);
  })
  

export {createUser, userLogin,userLogOut,getAllUsers};
