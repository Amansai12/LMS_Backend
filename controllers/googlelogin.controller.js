const User = require("../models/user.model");
const jwt = require('jsonwebtoken')
const googlelogin = async (req, res, next) => {
  const { email, displayName, photoURL } = req.body;
  try {
    const u = await User.findOne({ email });
    const expdate = new Date(Date.now() + 86400000)
    if (u) {
      const token = jwt.sign({ name:u.name,photoURL:u.photoURL,_id:u._id,email:u.email,id:u.id,phone:u.phone,admin:u.admin}, 'amansaiisheroofeveryone');
      res.cookie("auth",token,{expires:expdate})
      res.status(200).send({name:u.name,photoURL:u.photoURL,_id:u._id,email:u.email,id:u.id,phone:u.phone,admin:u.admin})
    } else {
      const pass = Math.random().toString(36).slice(-8);
      const nuser = new User({
        name: displayName,
        email: email,
        photoURL:photoURL,
        password: pass,
      });
      await nuser.save();
      const token = jwt.sign({ name:nuser.name,photoURL:nuser.photoURL,id:nuser._id,email:nuser.email,id:nuser.id,phone:nuser.phone,admin:nuser.admin }, 'amansaiisheroofeveryone');
      res.cookie("auth",token,{expires:expdate})
      res.status(200).send({name:nuser.name,photoURL:nuser.photoURL,id:nuser._id,email:nuser.email,id:nuser.id,phone:nuser.phone,admin:nuser.admin})
    }
    
  } catch (err) {
    res.status(500).json({message:err})
  }
};

module.exports = googlelogin
