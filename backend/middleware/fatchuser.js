var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Pransuisagood$oy';

const fatchuser  = (req, res, next) =>{
    // Get the user from the jwt token and add idto request object
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error : "please authanticate using a valid token"})
    }
    try {
       const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next() 
    } catch (error) {
        res.status(401).send({error : "please authanticate using a valid token"})
    }
    
}





module.exports = fatchuser;