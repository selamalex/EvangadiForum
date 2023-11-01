 const express=require('express');
 const authMiddleware=require('../middleware/authMiddleware')
 const router=express.Router();
 //user controllers
const{register,login,checkUser}= require('../controller/userContrpller');
//register route
router.post("/register", register)
//login user
router.post("/login",login)
//check user
router.use("/check",authMiddleware, checkUser)

module.exports=router ;