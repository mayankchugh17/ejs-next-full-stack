const jwt = require("jsonwebtoken");

const genToken = (username) =>{
    const token = jwt.sign(username, process.env.JWT_SECRET);
    return token;
}

module.exports = genToken;