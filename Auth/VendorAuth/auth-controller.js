const Service=require('./auth-services')
const _ = require("lodash")
const jwt = require("jsonwebtoken");


module.exports={
    async login(req,res,next)
    {
        try {
            const vendordata = req.body;
            const loggineduser = await Service.login(vendordata);
            //console.log(loggineduser)
            if(loggineduser)
            {
                const filteredUser =_.pick(loggineduser, ['email', 'phone', 'clinical_name']);
           // console.log(filteredUser)
            // sign the payload with jwt.
            const token =  jwt.sign(filteredUser, process.env.JWT_ENCRYPTION, {
                expiresIn: process.env.JWT_EXPIRATION
            });
            return res.json({
                message: 'Login Successful',
                user:filteredUser,
                token,
            })
            }
            else
            {
                return res.status(400).json({
                    message: 'Login failed||username or password incorrect'
                })
        }
    }catch(err)
        {
            next(err);
        }
}
}