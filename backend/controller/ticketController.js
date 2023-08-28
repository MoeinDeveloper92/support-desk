const asyncHandler = require("express-async-handler")
const { User } = require("../model/userModel")
const Ticket = require("../model/ticketModel")



//@desc     Get all the user's ticklet
//@route    GET /api/tickets
//@access   Private
const getTickets = asyncHandler(async (req, res, next) => {
    //Get the user unisg the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not Found")
    }

    const tickets = await Ticket.find({ user: req.user.id })

    res.status(200).json(tickets)
})


//@desc     Create New  ticket
//@route    POST /api/tickets
//@access   Private
const createTicket = asyncHandler(async (req, res, next) => {
    const { description, product } = req.body

    if (!description || !product) {
        res.status(400)
        throw new Error("Please add a product and description")
    }

    //check the user
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User not found.")
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: "new"
    })
    res.status(201).json(ticket)
})

//@desc     get user ticket
//@route    GET /api/tickets/:id
//@acceess  Private
const getTicket = asyncHandler(async (req, res, next) => {
    //get user again by the req.user.id
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("user not found")
    }

    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(401)
        throw new Error("Ticket not found")
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not Authorized")
    }

    res.status(200).json(ticket)
})



//@desc     Delte user ticket
//@route    DELETE /api/tickets/:id
//@acceess  Private
const deleteTicket = asyncHandler(async (req, res, next) => {
    //get user again by the req.user.id
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("user not found")
    }

    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(401)
        throw new Error("Ticket not found")
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not Authorized")
    }

    await Ticket.findByIdAndRemove(req.params.id)

    res.status(200).json({ success: true })
})


//@desc     update user ticket
//@route    PUT /api/tickets/:id
//@acceess  Private
const updateTicket = asyncHandler(async (req, res, next) => {
    //get user again by the req.user.id
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("user not found")
    }

    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(401)
        throw new Error("Ticket not found")
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not Authorized")
    }

    const updTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updTicket)

})

module.exports = {
    createTicket,
    getTickets,
    getTicket,
    deleteTicket,
    updateTicket

}