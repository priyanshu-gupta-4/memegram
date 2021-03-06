const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types
const userSchema = mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}],
    status:String,
    pic:{type:String,default:"https://res.cloudinary.com/pg1/image/upload/v1640000851/avatar_hxtthr.png"}
})
mongoose.model("User",userSchema )