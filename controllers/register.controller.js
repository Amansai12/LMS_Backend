const User  = require('../models/user.model')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const register = async (req,res,next) => {
    const {name,id,email,phone,password} = req.body;
    const newpass = bcryptjs.hashSync(password,10)
    const user = new User({
        name,id,email,phone,password:newpass
    });
    try{
        await user.save();
        const expdate = new Date(Date.now() + 86400000)
        const token = jwt.sign({ name:user.name,photoURL:user.photoURL,_id:user._id,email:user.email,id:user.id,phone:user.phone,admin:user.admin }, 'amansaiisheroofeveryone');
        res.cookie("auth",token,{expires:expdate}).status(200).send({name:user.name,photoURL:user.photoURL,_id:user._id,email:user.email,id:user.id,phone:user.phone,admin:user.admin});
    }catch(err){
        res.status(500).json(err)
        console.log(err.message);
    }
}

module.exports = register