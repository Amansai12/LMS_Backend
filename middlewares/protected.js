const jwt = require('jsonwebtoken')
const protect = (req,res,next) => {
    
    const token = req.headers.authorization
    try{
        const x = jwt.verify(token,'amansaiisheroofeveryone')
        if(x){
            next()
        }else{
            res.status(500).json({message:"something went wrong"})
        }
    }catch(err){
        res.status(500).json({message:err})
    }
    
}

module.exports = protect