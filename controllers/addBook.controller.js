const cloudinary = require('cloudinary')
const book = require('../models/book.model')
const getUri = require('../utils/datauri')
cloudinary.v2.config({
    cloud_name: 'damkoygfn',
    api_key: '838921664151598',
    api_secret: 'wU3ZOg9FSvFGp0FH1Co9YK6S0VM',
    secure: true,
  });
const addBook = async (req,res) => {
    try{
        nname = req.body.name
        description = req.body.description
        category = req.body.category
        quantity = req.body.quantity
        file = req.file
        
        const r = await cloudinary.uploader.upload(file.path)
        console.log(r)
        const x = new book({
            name:nname,
            bookid: Math.random().toString(36).slice(-5),
            description:description,
            category:category,
            quantity:quantity,
            photoURL:r.url
        })
        x.save()
        res.send({message:"Book added sucessfully",data:x})
        
        
    }catch(err){
        res.status(500).send({error:"Something went wrong.. "+err})
    }
}

module.exports = addBook