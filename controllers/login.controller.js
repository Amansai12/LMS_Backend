const User  = require("../models/user.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var express = require('express');
var router = express.Router();
const login = async (req,res,next) => {
    const {email,password} = req.body

    const user = await User.findOne({email})
    if(!user){
        res.status(500).json({message:"Ivalid Credentials"})
    }
    else{
        const x = bcrypt.compareSync(password,user.password)
        if(x){
            const expdate = new Date(Date.now() + 86400000)
            const token = jwt.sign({ name:user.name,photoURL:user.photoURL,_id:user._id,email:user.email,id:user.id,phone:user.phone,admin:user.admin,remarks:user.remarks }, 'amansaiisheroofeveryone');
            res.cookie("auth",token,{expires:expdate,httpOnly:false})
            res.status(200).send({name:user.name,photoURL:user.photoURL,_id:user._id,email:user.email,id:user.id,phone:user.phone,admin:user.admin})
        }else{
            res.status(500).json({message:"Invalid credentials"})
        }
    }

}


module.exports = login