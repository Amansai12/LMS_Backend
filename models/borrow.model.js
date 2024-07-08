const mongoose = require('mongoose')

const borrowSchema = mongoose.Schema({
    student_id:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    book_id:{
        type:mongoose.Types.ObjectId,
        ref:'book'
    },
    borrowDate:{
        type:Date,
        default:Date.now()
    },
    endTime:{
        type:Date,
        required:true
    }
})

module.exports = mongoose.model('borrow',borrowSchema)