const express = require('express');
const router = express.Router();       //use router when initialised in seprate folder
const mongoose = require('mongoose')
const User = mongoose.model('User');
const UserOtp = mongoose.model('UserOtp') 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/key');
const requireLogin = require('../middleware/requireLogin')
const sendMail = require("../nodemailer");
router.get('/protected',requireLogin,(req,res)=>{
    res.send("welcome to posts");
})
router.post('/signup',(req,res)=>{
    const {name,email,password,pic} = req.body;
    if(!email || !password || !name){
        res.status(422).json({error:"Please Enter All details"})    //res.json to send in json format and 422 to get status code 422
    }
    //to save user in database
    User.findOne({email:email})         //check if user is found on database return error else save it to db
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already Exists with this email"})
        }
        bcrypt.hash(password,12)                    //use bcrypt promise which return hashed password and then save it in database
        .then(hashedPassword=>{
            const user = new User({                                             //create new user with req data
                email,
                password:hashedPassword,
                name,
                pic,
                verified:false
            })
            var otp = Math.floor(Math.random()*1000000);
            user.save()                                                         //save user after creating it                
            .then(user=>{
                res.json({message:"saved successfully"})
                sendMail(user,otp)     
                const userVerify = new UserOtp({
                    email,
                    otp
                })
                userVerify.save()
                .then(userOtp=>{
                    console.log(userOtp);
                })
                .catch(err=>{
                    console.log(err)
                })
            })
            .catch(err=>{
                console.log(err)
            })
        })
        
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/verify',async(req,res)=>{
    try {
        var {email,otp} = req.body;
        if(!email||!otp){
            res.status(500).json({error:"provide all data pls"})
        }
        const verficationRecord = await UserOtp.findOne({email})
        if(!verficationRecord){
            res.status(401).json({erorr:"no user found with this id"})
        }
        await User.updateOne({email:email},{verified:true})
        await UserOtp.deleteMany({email})
        res.json({
            status:"verified",
            message:"user email verified success"
        })
    }
    catch (err){
        res.json({erorr:err});
    }
})


router.post('/login',(req,res)=>{     //signin route
    const{email,password} = req.body;
    if(!email||!password){
        return res.status(422).json({error:"please enter all details"});
    }
    User.findOne({email:email})                                                         //if user is found it compare password using bcrypt and if password is correct it issue a JWT to the User to allow user to access protected resource        
    .then((savedUser)=>{
        if(!savedUser)  return res.status(404).json({error:"incorrect email/password"})
        if(savedUser.verified === false){
            console.log(savedUser.verified);
            return res.status(404).json({error:"email not verified"});
        }
        bcrypt.compare(password,savedUser.password) 
        .then((result)=>{
            if(result) {
                // res.json({message:"login successfull"});
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)                  // generate token using jwt                                                    
                const {_id,name,email,followers,following,pic,status} = savedUser
                res.json({token,user:{_id,name,email,followers,following,pic,status}});
            }
            else res.status(404).json({error:"incorrect email/password"});
        })
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router;