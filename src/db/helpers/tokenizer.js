const jwt = require("jsonwebtoken")
const secret = process.env.SECRET;
const bcrypt = require("bcrypt")
const expiresIn = process.env.EXPIRES_IN

const signer = async user=>{
    return jwt.sign(user,secret,{expiresIn})
}
const verifyToken = async req=>{
    const {operationName} = await req.body
    if(operationName === "login" || operationName==="signup"){
        return {}
    }
    const token = fromHeaderOrQuerystring(req)
    if(token){
        try {
            return await jwt.verify(token,secret)    
        } catch (error) {
            throw new AuthenticationError(
                'Your session expired. Sign in again.',
              );
        }
    } 
}
function fromHeaderOrQuerystring (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
          return req.query.token;
        }
    
   
    return null;
  }
  
module.exports.signToken = signer;
module.exports.verifyToken = verifyToken