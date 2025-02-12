const express=require('express');
const router = express.Router();
const messegeController = require("../controller/messege.controllers");
const { protectRoute } = require('../middleware/auth.middleware');
const { getAllUserSideBar,messages } = messegeController;
router.get('/user',protectRoute ,getAllUserSideBar);
router.get('/:id',protectRoute,messages)

module.exports=(router);