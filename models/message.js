const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const MessageSchema = new mongoose.Schema({
        ConversationId:{
            type:ObjectId,
            ref:"Conversation"
        },
        Sender:{
            type:ObjectId,
            ref:"User"
        },
        text:{
            type:String
        }
    },
    {timestamps:true}
)

mongoose.model("Message",MessageSchema);