const nodemailer = require('nodemailer')
const User = require('../models/user.model')
const sendmail = async (req,res) => {
    try{
        const u = await User.findOne({email:req.params.email})
        u.remarks += 1
        await u.save();
        let testaccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "justus20@ethereal.email",
          pass: "z2n79CCNWAu27XVspj",
        },
    });

    const info = await transporter.sendMail({
        from: "justus20@ethereal.email", // sender address
        to: `${req.params.email}`, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    
    res.send(info.messageId)
    }catch(err){
        res.status(500).send({error:"Something went wrong"})
    }
}

module.exports = sendmail