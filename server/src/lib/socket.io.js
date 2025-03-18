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

getReceiverSocketId=(userId)=>{
return userSocketMap[userId];
}


io.on("connection", (socket) => {
    const userId=socket.handshake.query.userId;
     if(userId) userSocketMap[userId]= socket.id
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    console.log("A user connected:", socket.id);


    socket.on("disconnect",()=>{
        console.log("a user disconnect",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
    
    });

module.exports={io,server,app,getReceiverSocketId};
