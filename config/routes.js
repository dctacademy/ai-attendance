const express = require('express');
const router = express.Router();

const { usersController } = require('../app/controllers/usersController');

router.use('/users', usersController);

module.exports = {
    routes: router
}