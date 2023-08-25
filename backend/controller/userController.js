const asyncHandlers = require("express-async-handler")
const { User } = require("../model/userModel")
const bcrypt = require("bcrypt")
const generateToken = require("../utils/generatetoken")



//@desc     POST register a new user
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandlers(async (req, res, next) => {
    //req.body is where data gets stored
    const { name, email, password } = req.body
    //Validation
    if (!name || !email || !password) {
        //this is Errorhandlers which sets as a middleware
        res.status(400)
        throw new Error("Please include all fields!!!")
    }

    //check for the user in the DB
    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error("User Already Exist!")
    }
    //create new user
    const newUser = await User.create({
        name,
        email,
        password
    })

    if (newUser) {
        //here we create and send token to the UI
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data!")
    }
})






//@desc     Login user to the applicaiton
//@route    POST /api/users/login
//@access   Public
const loginUser = asyncHandlers(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("Please add Email and Password.")
    }

    //check for the user in the database
    const user = await User.findOne({ email })
    if (!user) {
        res.status(400)
        throw new Error("You should first Register!")
    }

    //check user and the password match
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        //UnAuthorized
        res.status(401)
        throw new Error("please check email and password")
    }

})





//@desc     Get current user
//@route    GET /api/users/me
//@access   Private
const getMe = asyncHandlers(async (req, res, next) => {
    const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    res.status(200).json(user)
})



module.exports = { getMe, registerUser, loginUser }