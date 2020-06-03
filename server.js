const express=require('express');
const cors =require("cors");
const bodyParser=require("body-parser");
const {connect}=require("mongoose");
const {PORT,DB}=require("./config/index")
const{success,error}=require('consola');
const vendor_routes=require('./Vendor/vendor-routes')
const passport=require('passport')


const app=express();

// ---------------middlewares-------------------s--

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

//Passport initialise

require ('./Auth/VendorAuth/auth-strategy')(passport)
app.use(passport.initialize()); 


app.use(bodyParser.json());
app.use('/api',vendor_routes); 

// ---------------middlewares ends---------------------


let StartApp= async ()=>
{
    try
    {
        await connect(DB,
            {useCreateIndex:true,
            useNewUrlParser:true,
            useUnifiedTopology:true})
            success({message:`succesfully database connected ${DB}`,badge:true})
         app.listen(PORT,err=>{
               if(err)
                {
                    error({message:err,badge:true})
                  
                }
                else
                {
                    success({message:`listening to port ${PORT}`,badge:true})
                }
                                })
    }
  
    catch(err)
    {
        error({message:err,badge:true})
    }
};
StartApp();