const mongoose = require("mongoose")

//which ticket applies to note/ and also which user

const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Ticket"
    },
    text: {
        type: String,
        required: [true, "Please add text"],
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    staffId: {
        type: String
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Note", noteSchema)