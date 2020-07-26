'use strict';
const router = require('express').Router();
const { catchErrors } = require('../utils/errors');
const { 
    getAllPosts,
    getUserInfo,
 } = require('../controllers').userController;

router.get('/info/:id', catchErrors(getUserInfo));
router.get('/posts', catchErrors(getAllPosts));

module.exports = router;