const http =require("http");
const express = require("express");
const app= express()
const{ Server}=require("socket.io");
const server=http.createServer(app);
app.use(express.json());


const io=new Server(server,{
   cors:{
       origin:"http://localhost:5173",
       credentials:true 
   }
   
})
const userSocketMap={};//{userId:socket.id}



io.on("connection", (socket) => {
    const userId=socket.handshake.query.userId;

    console.log("A user connected:", socket.id);
    socket.on("disconnect",()=>{
        console.log("user is disconnect",socket.id)
    })
    
    });

module.exports={io,server,app};
