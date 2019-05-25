const express = require('express')
const bcryptjs = require('bcryptjs')
const router = express.Router()
const { User } = require('../model/User')
const { authenticateUser } = require('../middlewares/authentication')

router.get('/all', (req, res) => {
    User.find()
        .then((users) => {
            res.send(users)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post('/register', (req, res) => {
    const body = req.body
    const user = new User(body)
    console.log("Before Saving...", user.isNew)
    user.save()
        .then((user) => {
            res.send(user)
            console.log("After Saving...", user.isNew)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post('/login', (req, res) => {
    const body = req.body

    User.findByCredentials(body.email, body.password)
        .then((user) => {
            return user.generateToken()
        })
        .then((token) => {
            res.send(token)
        })
        .catch((err) => {
            res.status(404).send(err)
        })
})

router.get('/account', authenticateUser, (req, res) => {
    const { user } = req
    res.send(user)
})

router.put('/account/reset', authenticateUser, (req, res) => {
    const { user } = req
    const body = req.body
    console.log(user._id, body.oldPassword, body.newPassword);
    
    User.findByCredentialsAndCompare(user._id, body.oldPassword, body.newPassword)
        .then((user) => {
            if (user) {
                res.send(user)
            }
            // res.send({notice: 'successfully reset your Pasword'})
        })
        .catch((err) => {
            res.send(err)
        })
})

router.delete('/logout', authenticateUser, (req, res) => {
    const { user, token } = req

    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
        .then(() => {
            res.send({ notice: 'Logged out Sucessfully' })
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    usersController: router
}