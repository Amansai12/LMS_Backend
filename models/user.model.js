const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    id:{
        type:String,
        default:"XXXXX"
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        default:"0000000000"
    },
    password:{
        type:String,
        required:true
    },
    photoURL:{
        type:String,
        default:"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
    },
    admin:{
        type:String,
        default:"no",
    },
    remarks:{
        type:Number,
        default:0
    }
},{timeStamps:true});

module.exports = mongoose.model('User',userSchema);