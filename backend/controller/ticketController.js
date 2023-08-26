const asyncHandler = require("express-async-handler")
const User = require("../model/userModel")
const Ticket = require("../model/ticketModel")

//@desc     Get all the user's ticklet
//@route    GET /api/tickets
//@access   Private
const getTickets = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        message: "Show all the user's ticket"
    })
})


//@desc     Create New  ticket
//@route    POST /api/tickets
//@access   Private
const createTicket = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        message: "Create a new ticket for the user"
    })
})



module.exports = {
    createTicket,
    getTickets
}