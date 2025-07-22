const {addUser,getUser,addScore}=require("../controller/UserController");
const express=require("express");
const route=express.Router();

route.post("/",addUser);
route.get("/",getUser);
route.post("/rank/",addScore);

module.exports=route;