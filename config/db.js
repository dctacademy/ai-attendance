const mongoose = require('mongoose')

mongoose.Promise = global.Promise
const CONNECTION_URI = (process.env.MONGOLAB_URI || 'mongodb://localhost:27017/ai-attendance')

mongoose.connect(CONNECTION_URI, { useNewUrlParser: true })
    .then(function () {
        console.log('connected to database')
    })
    .catch(function () {
        console.log('OOPS!!! Something went wrong in database connection')
    })
module.exports = {
    mongoose
}