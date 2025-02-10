const jwt=require('jsonwebtoken')
require('dotenv').config()

exports.generateToken=(payload,res)=>{
const token =jwt.sign(payload,process.env.Secrat_key,{expiresIn:"7d"});
console.log(token);
res.cookie("jwt",token,{maxAge:7*24*60*60*1000,httpOnly:true,sameSite:"strict"})
return token;
}
