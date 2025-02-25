const jwt = require('jsonwebtoken');
const { User } = require("../modals/user.model")
exports.protectRoute = async (req, res, next) => {
    const token = req.cookies.jwt;

  
    if (!token) {
        console.log('token',token);
        return res.status(401).json({ messege: "anotuhrized invalid token" })
    }
    const decode = jwt.verify(token, process.env.Secrat_key);
    if (!decode) {
        console.log("this decode user id", decode);
        return res.json({ messege: "invalid token" })
    }
    const UserDb = await User.findById(decode.id).select("-password");
    if (!UserDb) {
        return res.json({ messege: "user invalid" });
    }
    req.user = UserDb;
    next();
}