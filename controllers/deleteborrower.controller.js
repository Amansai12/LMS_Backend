const borrow = require('../models/borrow.model')
const book = require('../models/book.model')
const deleteBorrower = async (req,res) => {

    try{
        _id = req.query.id
        book_id = req.query.book_id
        const b = await book.findOne({_id:book_id})
        b.quantity += 1;
        await b.save();
       const x = await borrow.deleteOne({_id:_id});
    res.status(200).send({message:"Deleted sucessfully"})
    
    }catch(err){
        res.status(500).send({error:err})
    }


}

module.exports = deleteBorrower