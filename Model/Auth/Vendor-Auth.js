const{Schema,model}=require('mongoose')
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const authSchema=new Schema(
    {
        
        clinical_name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        phone:{
            type:String,
            unique:true,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        acount_type:{
            type:String,
            default:"vendor"
        }
    },
    {
        timestamps:true,

    }  
)
authSchema.plugin(AutoIncrement, {inc_field: 'vendorid'});

module.exports=model("user_auth",authSchema)