var jwt = require('jsonwebtoken');
const JWT_SECRET = "@12525";


const fetchuser =(req, res, next )=>{
    // Get user from req header (jwt token) and add id to req object
    const token = req.header('auth-token');
    if(!token)
    {
        return res.status(401).send({error: "please authenticate using the valid token"});
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // new request req.user has the decoded.user object
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).send({error: "please authenticate  the valid token"});
    }
}
module.exports = fetchuser;