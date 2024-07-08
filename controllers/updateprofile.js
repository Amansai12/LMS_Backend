const User = require('../models/user.model')

const updateprofile = async (req,res,next) => {
    const {name,id,phone,email} = req.body
    
    
    try{
        if(req.body.photoURL){
            const photo = req.body.photoURL
            const u = await User.updateOne({email},
                {
                    $set:{name,id,phone,photoURL:photo}
                })
            const x = await User.findOne({email})
            res.status(200).send({name:x.name,phone:x.phone,id:x.id,email:x.email,photoURL:x.photoURL,_id:x._id,admin:x.admin})
        }else{
            const u = await User.updateOne({email},
                {
                    $set:{name,id,phone}
                })
            const x = await User.findOne({email})
            res.status(200).send({name:x.name,phone:x.phone,id:x.id,email:x.email,photoURL:x.photoURL,_id:x._id,admin:x.admin})
        }
    }catch(err){
        res.status(500).json({message:err})
    }
   

}

module.exports = updateprofile