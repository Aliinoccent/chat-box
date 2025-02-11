const express = require('express')
const app = express();
const cors = require('cors');
const user = require('./Router/chatting')
const http = require('http');
const SocketIo = require('socket.io')
const cookieParser=require('cookie-parser')
require('dotenv').config();
const Db=require('./configer/db');
app.use(cookieParser());
app.use(express.json())
const server = http.createServer(app);
const authRouters=require('./Router/auth.router')

app.use ('/api/auth',authRouters)























// io = SocketIo(server);
// app.use('/user', user)
// io.on('connection', (socket) => {
//     console.log('user connected', socket.id)
//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });
// })
// app.use(cors());





port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log('app listen on port ', port);
    Db.MongooDb();
})