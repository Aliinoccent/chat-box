const mongoose = require('mongoose');
// const { User } = require('./user.model');
const messegeSchema=new mongoose.Schema({
    senderId:{
         type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    reciverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
    },
    image:{
        type:String,
        
    }
},
{timestamps:true}
)

const Messages=mongoose.model("Message",messegeSchema)
module.exports={Messages};