
const winston = require('winston')
// require('winston-mongodb')
require('express-async-errors')


module.exports = function () {

    winston.exceptions.handle(
        new winston.transports.File({ filename: 'uncaughtException.log' }))

    process.on('unhandleRejection', (ex) => {
        throw ex
    })
    winston.add(new winston.transports.File({ filename: 'logfile.log', level: 'error' }))
    // winston.add(new winston.transports.MongoDB({
    //     db: "mongodb://localhost/vidly",
    //     level: 'info'
    // }))
}