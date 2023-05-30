const express = require('express');
const router = express.Router();       //use router when initialised in seprate folder
const mongoose = require('mongoose')
const post = mongoose.model('Post');
const requireLogin = require('../middleware/requireLogin')
const User = mongoose.model("User");

router.get("/profile/:id",requireLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        post.find({postedBy:user})
        .populate("postedBy","_id name")
        .exec((err,posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user,posts})
        })
    })
    .catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})

router.get("/alluser",(req,res)=>{
    User.find()
    .select("-password -followers -following -status")
    .then(users=>{
        res.json({users})
    })
    .catch(err=>{
        res.json({err})
    })
})

router.get("/searchUser/:ustr",(req,res)=>{
    const reg=new RegExp("^"+req.params.ustr+".*");
    User.find({name:{ $regex: reg, $options: 'i'}})
    .select("-password -followers -following -status")
    .then(users=>{
        res.json({users})
    })
    .catch(err=>{
        res.json({err})
    })
})

router.get("/followers", requireLogin, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const followerPromises = user.followers.map((follower) =>
        User.findById(follower._id.toString()).select("-password -followers -following -status")
      );
      const followers = await Promise.all(followerPromises);
      res.json(followers);
    } catch (err) {
      res.json({ err });
    }
});
router.put("/follow",requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{
        $push:{following:req.body.followId}
    },{new:true},(err,result)=>{
        if(err) {
            return res.status(422).json({error:err})
        }
        const r = result;
        User.findByIdAndUpdate(req.body.followId,{
            $push:{followers:req.user._id}
        },{new:true})
        .then(result=>{
            res.json({foundUser:result,LogUser:r})
        })
        .catch(err=>{
            return res.status(422).json({error:err});
        })
    }).select("-password");
})

router.put("/unfollow",requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{
        $pull:{following:req.body.followId}
    },{new:true},(err,result)=>{
        if(err) {
            return res.status(422).json({error:err})
        }
        const r = result;
        User.findByIdAndUpdate(req.body.followId,{
            $pull:{followers:req.user._id}
        },{new:true})
        .then(result=>{
            res.json({foundUser:result,LogUser:r})
        })
        .catch(err=>{
            return res.status(422).json({error:err});
        })
    }).select("-password");
})

router.put('/updatepic',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        res.json(result)
    }).select("-password")
})
router.put('/updatestatus',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{status:req.body.status}},{new:true},(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        res.json(result)
    }).select("-password")
})
module.exports = router