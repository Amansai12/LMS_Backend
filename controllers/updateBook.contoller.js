const book = require('../models/book.model')
const updateBook = async (req,res) => {
    try{
        const b_id = req.body.book_id;
        const q = req.body.quantity;
        const b = await book.findOne({bookid:b_id})
        if(b){
            b.quantity += parseInt(q);
        await b.save();
        console.log(b)
        res.status(200).send({message:"Updated successfully"})
        }else{
            res.status(500).send({error:err})
        }
    }catch(err){
        res.status(500).send({error:err})
    }
}

module.exports = updateBook