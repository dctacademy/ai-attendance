const { User } = require('../model/User')
const authenticateUser = (req, res, next) => {
    const token = req.header('x-auth')
    User.findByToken(token)
        .then((user) => {
            if (user) {
                req.user = user
                req.token = token
                next()
            } else {
                res.status('401').send({ notice: 'token not available' })
            }

        })
        .catch((err) => {
            res.status('401').send(err)
        })
}


module.exports = {
    authenticateUser
}
