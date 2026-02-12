const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) =>{
    try {
        let {token} = req.cookies;
        if(!token) {
            return res.redirect("/unauthorized");
            // return res.status(400).json({message:"user doesn't have token"});
        } 

        let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("verify token is ", verifyToken);

        next();
    } catch (error) {
        console.log("isAuth error");
        console.log(error);
        return res.status(500).json({message:"is Auth error"}); 
    }
};

module.exports = isAuth;

