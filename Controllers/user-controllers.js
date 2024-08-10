const User = require("../db/Models/User");




const getUserById = async (req,res,next) =>{

    try {
        
        const {userId} = req.params;

        const userData = await User.findById(userId);

        if(!userData) {
            return   next({message:"User not available",status:401})
        }

        return res.json(userData)
        
    } catch (error) {
        console.log(error)
        return next({message:"Failed to fetch user",status:500})
        
    }
}

module.exports = {getUserById};