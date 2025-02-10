const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    fullName:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,

    },
    profilePic:{
        default:"",
        type:String
    }
   
},
{timestamps:true})

const User=mongoose.model("User",userSchema);
module.exports={User};