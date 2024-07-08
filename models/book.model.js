const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    bookid:{
        type:String,
    },
    name:{
        type:String,
        required:true,
    },
    category:{
        type:String,
    },
    quantity:{
        type:Number,
        default:0,
    },
    description:{
        type:String
    },
    photoURL:{
        type:String,
        default:"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
    }
})

module.exports = mongoose.model('book',bookSchema);