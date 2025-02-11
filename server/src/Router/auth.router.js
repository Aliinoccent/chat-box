const express=require('express');
const router= express.Router();
const controller= require('../controller/auth.controllers')
const {protectRoute}=require("../middleware/auth.middleware")
const {signup,signin,signout,updateProfile,check}=controller;
router.post('/signup',signup)
router.post('/signin',signin)
router.post('/signout',signout)
router.put('/update-profile',protectRoute,updateProfile)
router.get("/check",protectRoute,check)
module.exports=(router)