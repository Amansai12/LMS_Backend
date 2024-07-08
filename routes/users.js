var express = require('express');
const updateprofile = require('../controllers/updateprofile');
var router = express.Router();
const protected = require('../middlewares/protected')
const User = require('../models/user.model')
const book = require('../models/book.model')
const adminProtect = require('../middlewares/adminprotect')
const borrow = require('../models/borrow.model');
const sendmail = require('../controllers/mail');
const deleteBorrower = require('../controllers/deleteborrower.controller')
/* GET users listing. */
router.get('/',adminProtect, async function(req, res, next) {
  try{
    const d = await User.find();
    res.send({data:d})
  }catch(err){
    res.send({error:err})
  }
});
router.post('/lend',adminProtect,async (req,res)=>{
  const {book_id,student_id,endDate} = req.body
  const x = await User.findOne({id:student_id})
  const b = await book.findOne({bookid:book_id})
  if(x && b){
    if(b.quantity >= 1){
      b.quantity -= 1
    await b.save()
    const br = new borrow({
      book_id:b._id,
      student_id:x._id,
      endTime:endDate
    })
    const r = await br.save();
    const q = await User.updateOne({_id:x._id},{$push:{books:b._id}})
    res.status(200).send({message:"Book lended successfully",details:r})
    }else{
      res.status(500).send({error:"Book is not available"})
    }
    
  }else{
    res.status(500).send({error:'Id not present'})
  }

})
router.get('/borrowers',adminProtect,async (req,res)=>{
  try{
    const data = await borrow.find().populate(['student_id','book_id'])
    res.status(200).send({data:data})
  }catch(error){
    res.status(500).send({error:error})
  }
})
router.get('/myborrows/:id',protected,async (req,res)=>{
  try{
  const id = req.params.id
  const x = await borrow.find({student_id:id}).populate('book_id')
  res.status(200).send({data:x})
  }catch(err){
    res.status(500).send({error:"Something went wrong"})
  }
})
//router.delete('')
router.get('/timedout',adminProtect,async (req,res)=>{
  try{
    const x = await borrow.find().populate(['student_id','book_id'])
    const d = Date.now()
    const data = x.filter((e)=> e.endTime < d)
    res.status(200).send({data:data})
  }catch(error){
    res.status(500).send({error:"something went wrong"})
  }
})
router.get('/mail/:email',adminProtect,sendmail)
router.post('/update',protected,updateprofile)

router.get('/delete',adminProtect,deleteBorrower)

module.exports = router;
