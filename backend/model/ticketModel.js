const mongoose = require("mongoose")


//each ticket going to be connected to a user
//we need to have a relation ship tp user and ticket
const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    //each ticket going to be associated with 
    //specific product
    product: {
        type: String,
        required: [true, "plesae select a product"],
        enum: ["iPhone", "Macbook Pro", "iMac", "iPad"]
    },
    description: {
        type: String,
        required: [true, "Please enter a description of the issue"]
    },
    status: {
        type: String,
        enum: ["new", "open", "closed"],
        default: "new"
    }

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Ticket", ticketSchema)