const express = require('express');
const router = express.Router();

const { authController } = require('../app/controllers/auth-controller');

router.use('/auth', authController);

module.exports = {
    routes: router
}