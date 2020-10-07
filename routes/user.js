'use strict';
const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
// const { getAllSupplements } = require('../controllers/adminController'); ne radi nzm sto
const { catchErrors } = require('../utils/errors');
const { 
    getAllPosts,
    getUserInfo,
    getAllSupplements,
    authenticate
 } = require('../controllers').userController;

router.get('/info/:id', passport.authenticate('jwt', {session: false}), catchErrors(getUserInfo));
router.get('/posts', passport.authenticate('jwt', {session: false}), catchErrors(getAllPosts));
router.get('/supplements', passport.authenticate('jwt', {session: false}), catchErrors(getAllSupplements));
router.post('/authenticate', catchErrors(authenticate))

module.exports = router;