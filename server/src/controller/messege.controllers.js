const { User } = require("../modals/user.model");
const {Messages}=require('../modals/messege.model');
const {cloudinary}=require('../lib/cloudinary')

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
            {senderId:usertochatId},{reciverId:myId}]});
            res.status(200).json({
                message:allMessages
            })
    }
    catch(error){
        console.log("error in messeges controller",error.message)
        res.status(500).json({message:"server side error",error:error.message})
    }
}
exports.sendMessage=async(req,res)=>{
    const {text,image}=req.body;
    const {id:reciverId}=req.params;
    const myid=req.user._id
    try {

      if(image){
        const picResponse= await cloudinary.uploader.upload(image);
        const imageUrl= picResponse.secure_url;
      }
      const newMessage=await new Messages({serderId:myid,reciverId,text,image:imageUrl})
      await newMessage.save();
     res.status(200).json({messages:newMessage});
    } catch (error) {
        console.log("send message error controller",error.message);
        res.status(500).json({message:error.message});
    }
}