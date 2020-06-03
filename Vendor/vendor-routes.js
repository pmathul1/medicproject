const express=require('express')
const router=express.Router()
const AuthController=require("../Auth/VendorAuth/auth-controller")

const Controller=require("../Vendor/vendor-controller")


//================vendor api starts=================
router.post("/vendor/login",AuthController.login)
router.post('/vendor/register',Controller.register)


module.exports=router