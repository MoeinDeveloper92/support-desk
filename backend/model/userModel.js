const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add name field"]
    },
    email: {
        type: String,
        required: [true, "Please add emial field"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add password field"]
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }


    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema)



module.exports = { User }