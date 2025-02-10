const { User } = require('../modals/user.model')
const bcrypt = require("bcryptjs");
const Token = require('../lib/util.jwt')

exports.signup = async (req, res) => {
    const { email, password, fullName } = req.body;

    try {
        if (!email || !password || !fullName) {
            res.json({ data: "all filed are required" });
        }
        if (password.length < 6) {
            return res.json({ error: 400, password: "minimum 6 character" })
        }

        const user = await User.findOne({ email })

        if (user) {

            return res.json({ error: 400, email: "email already exist" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ email, fullName, password: hashPassword });
        const data = await newUser.save()

        if (data) {
            Token.generateToken({ id: newUser._id }, res);
            res.status(200).json({
                fullName: data.fullName,
                email,
                status: true
            })
        }
        else {

            return res.json({ error: 400, data: 'user invalid format' })
        }
    }
    catch (error) {
        console.log("error from email")
        res.json({ error: error.message })
    }
}

exports.signin = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.json({ data: "all field are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ data: "invalid caridantial" })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
         return   res.json({data:"invalid password"})
        }
        Token.generateToken({id:user._id},res)
        res.json({
            password:user.password,
            email:user.email
        })

    }
    catch (error) {
        res.json({ error: error.message })
    }
}

exports.signout = async (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({logout :"logout sucessfully"})
    }
    
    catch(error) {
        res.json({error:error.message})
    }
}
