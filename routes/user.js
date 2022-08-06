const express = require("express");
const router = express.Router();
const {isAdmin,isAuth,isStaff,isManager} = require('../middleware/auth')
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { SECRET } = process.env;



// register user
router.post("/api/auth/register",isAuth, async(req,res)=>{
    // destructure request body
    const { firstName,lastName ,email,password} = req.body;

    if (!(email && password && firstName && lastName)) {
        res.status(400).send("All input is required");
      }
  
     try {
        let existingUser =await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({statusCode:400,message:"user exists"})
        };
        const salt = await bcrypt.genSalt(10)
        
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
        });

        // create token
        const token = jwt.sign(
            { user_id: newUser._id, email:newUser.email,isAdmin:newUser.isAdmin, isStaff:newUser.isStaff, isManager:newUser.isManager},
            SECRET,
            {
              expiresIn: "2h",
            });
                        
        newUser.token = token
        
        res.status(400).send("wrong token")
     } catch (error) {
        console.log(error.message);
        res.status(402).send('Error')
     }
});

// User Login route
router.post(
  "api/auth/login",isAuth,isAdmin,isManager,isStaff,async  (req,res) => {
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            { user_id: newUser._id, email:newUser.email,isAdmin:user.isAdmin, isStaff:user.isStaff, isManager:user.isManager},
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          user.token = token;
    
          // user
          res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
});


// logout user
router.put("/api/auth/logout", isAuth,isAdmin,isManager,isStaff, async (req,res)=>{
    let splittedHeader = req.header("Authorization").split(" ");
    if (splittedHeader[0] !== "Bearer")
      return res.status(401).json({
        statusCode: 401,
        message: "authorization format is Bearer <token>",
      });
  
    jwt.sign(splittedHeader[1], "", { expiresIn: 1 }, (logout, err) => {
      if (logout) {
        console.log(logout);
        res.send({ msg: "You have been Logged Out" });
      } else {
        res.send({ msg: "Error" });
      }
    });
  }
  );



module.exports = router;
