const authRouters=require('./Router/auth.router')
const messeges=require('./Router/messege.router')
const {app,server}=require('./lib/socket.io')
const cors = require('cors');
const cookieParser=require('cookie-parser')
require('dotenv').config();
const Db=require('./configer/db');

app.use(cookieParser());
// app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true 
}))

app.use ('/api/auth',authRouters)
app.use('/api/messeges',messeges)


port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log('app listen on port ', port);
    Db.MongooDb();
})