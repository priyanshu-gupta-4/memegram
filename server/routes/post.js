const express = require('express');
const router = express.Router();       //use router when initialised in seprate folder
const mongoose = require('mongoose')
const post = mongoose.model('Post');
const requireLogin = require('../middleware/requireLogin')
router.post("/createpost",requireLogin,(req,res)=>{
    const {title,body,url} = req.body;
    if(!title||!body||!url){
        return res.status(422).json({error:"Please add all the fields"})
    } 
    req.user.password = undefined
    const Post = new post({
        title,
        body,
        photo:url,
        postedBy:req.user
    })
    Post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get("/allposts",requireLogin,(req,res)=>{
    post.find()
    .populate("postedBy","_id name pic")
    .populate("comments.postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        res.json({err})
    })
})
router.get("/subposts",requireLogin,(req,res)=>{
    post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name pic")
    .populate("comments.postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        res.json({err})
    })
})

router.get("/mypost",requireLogin,(req,res)=>{
    post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(myposts=>{
        res.json({myposts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.delete("/deletepost/:postId",requireLogin,(req,res)=>{
    post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err|| !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString()===req.user._id.toString()){
            post.remove()
            .then(result=>{
                res.json(result);
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
})

router.put("/like",requireLogin,(req,res)=>{
    post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    })
    .exec((err,result)=>{
        if(err) return res.status(422).json({error:err})
        else res.json(result)
    })

})

router.put("/unlike",requireLogin,(req,res)=>{
    post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    })
    .exec((err,result)=>{
        if(err) return res.json({error:err})
        else res.json(result)
    })

})

router.put("/comment",requireLogin,(req,res)=>{
    const comment ={text:req.body.text,postedBy:req.user._id}
    post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .exec((err,result)=>{
        if(err) return res.status(422).json({error:err})
        else res.json(result)
    })
})


module.exports = router