var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const register = require('../controllers/register.controller');
const login = require('../controllers/login.controller');
const googlelogin = require('../controllers/googlelogin.controller');
const about = require('../controllers/about.controller');
const protect = require('../middlewares/protected');
const adminprotect = require('../middlewares/adminprotect')
const addBook = require('../controllers/addBook.controller')
const book = require('../models/book.model')
const singleUpload = require('../middlewares/multer')
const multer  = require('multer');
const updateBook = require('../controllers/updateBook.contoller');
mongoose.connect("mongodb+srv://Amansai:Z7Llx7a6TAqx8VGw@cluster0.fexreup.mongodb.net/auth?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
  console.log("Connected to database");
}).catch((err)=>{console.log("connection failed:",err)})
const upload = multer({ dest: 'uploads/' })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hello world");
});

router.post('/signup',register);
router.post('/login',login)
router.post('/glogin',googlelogin)
router.post('/about',protect,about)
router.post('/addbook',adminprotect,upload.single('file'),addBook);
router.post('/updatebook',adminprotect,updateBook)
router.get('/books',async (req,res)=>{
  try{
    const data = await book.find()
    res.status(200).send({data:data})
  }catch(err){
    res.status(500).send({error:"Something went wrong"})
  }
})


module.exports = router;
