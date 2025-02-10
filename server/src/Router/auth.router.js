const express=require('express');
const router= express.Router();
const controller= require('../controller/auth.controllers')
const {signup,signin,signout}=controller;
router.post('/signup',signup)
router.post('/signin',signin)
router.post('/signout',signout)
module.exports=(router)