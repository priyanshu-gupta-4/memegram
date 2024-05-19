const express=require('express');
const router=express.Router();
const requireLogin = require('../middleware/requireLogin')

const {openaikey}=require("./key");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: req,
});
const openai = new OpenAIApi(configuration);
router.post('/generateImg',(req,res)=>{
    // console.log("hello")
    // const Creater=async ()=>{
    //     try{
    //         const result=await openai.CreateImage({
    //             prompt:"polar bear",
    //             n:1,
    //             size:'512x512'
    //         })
    //         const img_url=result.data.data[0].url;
    //         res.send(img_url);
    //     }
    //     catch(err){
    //         res.send("err");
    //         console.log(err);
    //     }
    // }
    // Creater()
    res.send("hello world");
})
module.exports=router