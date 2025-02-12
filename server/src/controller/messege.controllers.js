const { User } = require("../modals/user.model");
const {Messages}=require('../modals/messege.model');

exports.getAllUserSideBar=async(req,res)=>{
    try{
        const user=req.user._id;
        
        const allUserExceptItself= await User.find({_id:{$ne : user}});
        console.log(allUserExceptItself,"all user ");
        res.status(200).json({messege:allUserExceptItself})

    }
    catch(error){
        console.log("get all user sider error")
        res.json({message:error.message})
        
    }
}
exports.messages=async (req,res)=>{
    const {id:usertochatId}=req.params;
    const myId=req.user._id;
    try{
        const allMessages=await Messages.find({$or:[{senderId:myId},{reciverId:usertochatId},
            {senderId:usertochatId},{reciverId:myId}]})
    }
    catch(error){

    }
}