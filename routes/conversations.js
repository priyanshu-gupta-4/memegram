const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin')
const Conversation = mongoose.model("Conversation");

router.post("/conversations",requireLogin,async (req,res)=>{
    const newConversation  = new Conversation({
        members:[req.user._id,req.body.recieverId]
    })

    try{
        const savedConverstion = await newConversation.save();
        res.status(200).json(savedConverstion);
    }
   catch(err){
        res.status(500).json(err);
    }
})

router.get("/conversations",requireLogin,async (req,res)=>{
    try{
        const conversations = await Conversation.find({
            members:{$in:[req.user._id]}
        })
        res.status(200).json(conversations);
    }
    catch(err){
        res.status(500).json(err)
    }
})
module.exports = router