const bcrypt=require("bcrypt")
const Vendor=require('../../Model/Auth/Vendor-Auth')

module.exports={
    async login(data){
        //console.log(`service data ${data.email}`)
        let user=await Vendor.findOne({email:data.email}).lean()
        //console.log(`service line 8 ${user}`)
        if(user)
        {
              if(await bcrypt.compare(data.password, user.password))
            // if(user.password==data.password)
            {
                return user;
            }
        }
        else
        {
            console.log("no user found")
        }
       
       
        
    }
    // async getUserbyemail(email) {
    //     const user = await User.findOne({email:email})
    //     return user;
    // },

}