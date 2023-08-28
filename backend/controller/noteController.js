const asyncHandler = require("express-async-handler")
const { User } = require("../model/userModel")
const Ticket = require("../model/ticketModel")
const Note = require("../model/noteModel")



//@desc     Gets note for a ticket
//@route    GET /api/tickets/:ticketId/note
//@access   Private
const getNotes = asyncHandler(async (req, res, next) => {
    //Get the user unisg the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not Found")
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not Authorized")
    }

    const notes = await Note.find({ ticket: req.params.ticketId })
    res.status(200).json(notes)
})


//@desc     Create Ticket Note
//@route    POST /api/tickets/:ticketId/note
//@access   Private
const addNote = asyncHandler(async (req, res, next) => {
    //Get the user unisg the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not Found")
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not Authorized")
    }

    const note = await Note.create({
        ticket: req.params.ticketId,
        text: req.body.text,
        isStaff: false,
        user: req.user.id
    })
    res.status(201).json(note)
})


module.exports = {
    getNotes,
    addNote
}