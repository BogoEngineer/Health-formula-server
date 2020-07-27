// Router & handlers & user & authentication
const router = require('express').Router();
const admin = require('./admin');
const user = require('./user');


module.exports = {
    admin: admin,
    user: user,
};