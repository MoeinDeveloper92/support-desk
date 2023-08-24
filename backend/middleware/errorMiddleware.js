

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    const message = err.message
    res.status(statusCode)
    res.json({
        message,
        //stack tracek/we have err.stack 
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
}


module.exports = { errorHandler }

//your error handler cna look whatever you want