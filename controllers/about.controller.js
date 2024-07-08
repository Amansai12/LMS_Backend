const User = require('../models/user.model')

const about = async (req,res,next) => {
    const {email} = req.body;

    try{
        const u = await User.findOne({email})
        if(u){
            res.status(200).send(u)
        }else{
            res.status(500).send({message:"user not exist"})
        }
    }catch(err){
        res.status(500).send(err)
    }
}

module.exports = about