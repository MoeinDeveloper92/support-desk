//@desc     POST register a new user
//@route    POST /api/users
//@access   Public
const registerUser = (req, res, next) => {
    //req.body is where data gets stored
    const { name, email, password } = req.body
    //Validation
    if (!name || !email || !password) {
        //this is Errorhandlers which sets as a middleware
        res.status(400)
        throw new Error("Please include all fields!!!")
    }
    res.status(201).json({
        message: "Register user"
    })
}

//@desc     Login user to the applicaiton
//@route    POST /api/users/login
//@access   Public
const loginUser = (req, res, next) => {
    res.status(200).json({
        message: "Login user"
    })
}

module.exports = { registerUser, loginUser }