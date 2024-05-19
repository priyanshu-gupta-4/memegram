const mongoose = require("mongoose")
const userotpSchema = mongoose.Schema({
    email :{
        type:String,
        required:true
    },
    otp :{
        type:String,
        required:true
    }
})
mongoose.model("UserOtp",userotpSchema )