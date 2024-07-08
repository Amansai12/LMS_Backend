const jwt = require('jsonwebtoken')
const protect = (req,res,next) => {
    
    const token = req.headers.authorization
    try{
        const x = jwt.verify(token,'amansaiisheroofeveryone')
        if(x && x.admin == 'yes'){
            next()
        }else{
            res.status(500).json({message:"Authorization required"})
        }
    }catch(err){
        res.status(500).json({message:"Session expired..please login again"})
    }
    
}

module.exports = protect