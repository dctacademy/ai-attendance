const mongoose = require('mongoose')

mongoose.Promise = global.Promise
const CONNECTION_URI = (process.env.MONGOLAB_URI || 'mongodb://localhost:27017/ai-attendance')

mongoose.connect(CONNECTION_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database')
    })
    .catch(() => {
        console.log('Error, connecting to database')
    })
module.exports = {
    mongoose
}