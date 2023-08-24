//we create a piece of middleware to create an authentication mechanism
const { User } = require("../model/userModel")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")



const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        //Get token from the req.headers.authorization
        token = req.headers.authorization.split(" ")[1]
        try {
            //get the id from the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password")
            //we call whatever the next piece of middleware is
            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not Authorized!")

        }
    } else {
        res.status(401)
        throw new Error("No Token, Not Authorized")
    }

})


module.exports = protect