const User = require("../db/Models/User");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const signUpUser = async (req, res, next) => {
  try {
    
    const {
      password,
      ...userdata
    } = req.body;


    const userExist = await User.findOne({
        email: userdata.email
    })

    if(userExist) return next({message:"User with this email already exist",extraDetails:"Please choose new credentials",status:400})
     
    const hashPassword = await bcrypt.hash(password,10);

    const newUser = new User({
        ...userdata,
        password: hashPassword
    })

    if(!newUser) return next({message:"Failed to create user",status:500,extraDetails:"Error"})
    await newUser.save();
    
    return res.json({message:"User created successfully",extraDetails:"Successfully inserted to database"})
  } catch (error) {
    next({message:"Error creating user", status:500, extraDetails: error.message})
  }

};

const signInUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      if (!email) {
        return next({ status: 400, message: "Fill the email field" });
      }
      if (!password) {
        return next({ status: 400, message: "Fill the password field" });
      }
  
      const userData = await User.findOne({ email: email });
      if (!userData) {
        return next({
          status: 404,
          message: "User not found",
          extraDetails: "Enter valid credentials",
        });
      }
  
      const hashPassword = userData.password;
  
      const verifyPassword = await bcrypt.compare(password, hashPassword);
  
      if (!verifyPassword) {
        return next({
          status: 401,
          message: "Enter correct password",
          extraDetails: "Enter valid credentials",
        });
      }
  
      const token = jwt.sign(
        { id: userData._id, email: userData.email },
        process.env.PRIVATEKEY
      );
  
      const { password: pass, ...rest } = userData._doc;
      return res
        .cookie("token", token, { httpOnly: true })
        .status(200)
        .json({rest,message:"Logged In Successfully"});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  
  const signOut = (req, res, next) => {
    try {
      const token = req.cookies.token;
  
      if (!token) {
        return next({ status: 404, message: "Token Not verified" });
      }
      return res
        .clearCookie("token")
        .status(200)
        .json({ message: "SignOut Successful" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  
  module.exports = { signUpUser, signInUser, signOut };

