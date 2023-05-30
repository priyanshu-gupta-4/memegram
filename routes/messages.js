const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin')
const Message = mongoose.model("Message");

router.post("/messages/:conversationId",requireLogin,async(req,res)=>{
    var conversationid = mongoose.Types.ObjectId(req.params.conversationId);
    const newMessage = new Message({
        ConversationId : conversationid,
        Sender: req.user._id,
        text: req.body.message.text
    })
    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);        
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.get("/messages/:conversationId",requireLogin,async(req,res)=>{
    try{
        const messages = await Message.find({
            ConversationId:req.params.conversationId
        });
        res.status(200).json(messages)
    }
    catch(err){
        res.status(500).json(err);
    }
})
module.exports = router