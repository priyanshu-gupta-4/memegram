const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/key')
const mongoose = require('mongoose')
const User = mongoose.model('User')
module.exports=(req,res,next)=>{
    const {authorization} = req.headers
    //authoriztion provided in header as "Bearer token"
    if(!authorization){
        return res.status(401).json({error:"you must be logged in"});
    }
    const token = authorization.replace("Bearer ","");        //retrieve token from authorization
    jwt.verify(token,JWT_SECRET,(err,payload)=>{              //verify token
        if(err){
            return res.status(401).json({error:"you must be logged in"})
        }
        const {_id} = payload
        User.findById(_id).then((userData)=>{
            req.user = userData;                    //save user data in req.user and give us access
            next()
        })
    })
}