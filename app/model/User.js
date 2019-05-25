const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value)
            },
            message: () => {
                return 'Invalid E-mail format'
            }
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128
    },
    tokens: [
        {
            token: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

userSchema.pre('validate', (next) => {
    const user = this
    if (user.isNew) {
        bcryptjs.genSalt(10)
            .then((salt) => {
                bcryptjs.hash(user.password, salt)
                    .then((encryptedPassword) => {
                        user.password = encryptedPassword
                        console.log("Encryption complete", user)
                        next()
                    })
            })
    } else {
        next()
    }
})

userSchema.methods.generateToken = () => {
    const user = this
    const tokenData = {
        _id: user._id,
        username: user.username,
        createdAt: Number(new Date())
    }
    const token = jwt.sign(tokenData, 'jwt@123')
    user.tokens.push({
        token
    })
    return user.save()
        .then((user) => {
            return Promise.resolve(token)
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

userSchema.statics.findByCredentials = (email, password) => {
    const User = this
    return User.findOne({ email })
        .then((user) => {
            if (!user) {
                return Promise.reject({ notice: "Invalid Email / Password" })
            }
            return bcryptjs.compare(password, user.password)
                .then((result) => {
                    if (result) {
                        return Promise.resolve(user)
                    } else {
                        return Promise.reject({ notice: "Invalid Email / Password" })
                    }
                })
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

userSchema.statics.findByCredentialsAndCompare = (id, oldPassword, newPassword) => {
    const User = this

    return User.findById(id)
        .then((user) => {

            console.log(oldPassword, user.password)

            return bcryptjs.compare(oldPassword, user.password)
                .then((result) => {
                    if (result) {
                        user.isNew = true
                        User.findByIdAndUpdate(user._id, { $set: { password: newPassword } }, { new: true, runValidators: true })
                            .then((user) => {
                                console.log(user)
                                res.send(user)
                            })
                            .catch((err) => {
                                res.send({ err: "Password Update Error" })
                            })
                        return Promise.resolve(user)
                    }
                    else {
                        return Promise.reject({ err: "Passwords do not match" })
                    }
                })
                .catch((err) => {
                    return Promise.resolve(err)
                })
        })
        .catch((err) => {
            return Promise.reject({ err: "Error: User not found" })
        })
}

userSchema.statics.findByToken = (token) => {
    console.log(token)
    const User = this
    let tokenData
    try {
        tokenData = jwt.verify(token, 'jwt@123')
    } catch (err) {
        return Promise.reject(err)
    }

    return User.findOne({
        _id: tokenData._id,
        'tokens.token': token
    })
        .exec()
}

const User = mongoose.model('User', userSchema)

module.exports = {
    User
}