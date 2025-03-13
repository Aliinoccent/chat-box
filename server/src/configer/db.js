const mongoose=require('mongoose');
require('dotenv').config()
const MongooDb= async()=>{
try{
  const connected= await mongoose.connect(process.env.Url)
  console.log('connected db')

}catch(error){
    console.log(error.message);

}
}
module.exports={MongooDb}