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
        res.redirect("/")
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

const {openaikey}=require("../config/key");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: openaikey,
});
const openai = new OpenAIApi(configuration);
router.post('/generateImg',(req,res)=>{
    console.log("generation request")
    const Creater=async ()=>{
        try{
            const result=await openai.createImage({
                prompt:req.body.txt,
                n:1,
                size:'256x256'
            })
            console.log(result)
            const img_url=result.data.data[0].url;
            console.log(img_url);
            res.send({url:img_url});
        }
        catch(err){
            console.log(err)
            res.send(err);
        }
    }
    Creater()
})

const deepai = require('deepai');

deepai.setApiKey('141fc7ab-e439-4a6a-b756-c7ce2da11bc8');

router.post('/generateImg2',(req,res)=>{
    console.log("generation request")
    const Creater=async ()=>{
        try{
            const result=await deepai.callStandardApi("text2img",{
                text:req.body.txt,
            })
            console.log(result)
            const img_url=result.data.data[0].url;
            console.log(img_url);
            res.send({url:img_url});
        }
        catch(err){
            console.log(err)
            res.send(err);
        }
    }
    Creater()
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
router.post("/generateimage",(req,res)=>{
    let aitxt=req.body.aitxt
    fetch("https://cors-anywhere.herokuapp.com/https://api.craiyon.com/search?version=z9j7i0uwg2qhcfyl&text="+aitxt+"&max_results=60", {
        headers:{"origin":"https://www.craiyon.com"},
body: null,
method: "GET"
}).then(
 data=>{
    console.log(data)
    data.json()})
.then(response => {
console.log(response);

let x=Math.floor(Math.random()*response.length)
res.json({url:"https://pics.craiyon.com/"+response[x].image_id});
})
.catch(error => {
console.log(error);
});
})
// router.delete("/deleteComm/:postId/:commId",requireLogin,(req,res)=>{
//     post.findOne({_id:req.params.postId})
//     .populate("postedBy","_id","comments")
//     .exec((err,post)=>{
//         if(err|| !post){
//             return res.status(422).json({error:err})
//         }
//         post.comments.forEach(element => {
//             if(element._id===req.params.commId&&element.postedBy._id.toString()===req.user._id.toString()){
//                 const idx=post.comments.indexOf(element);
//                 if(idx>-1) post.comments.splice(idx,1);
//                 res.json("deleted comment");
//             }
//             else {
//                 res.status(402).json("unauthorized");
//             }
//         });
//     })
// })
module.exports = router