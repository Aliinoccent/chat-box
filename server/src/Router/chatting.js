const express=require('express');
const router=express.Router();
const controller=require('../controller/users')
const {User} = controller;

router.get('/',User);
module.exports=router