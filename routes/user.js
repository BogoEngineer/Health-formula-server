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
    authenticate,
    changePassword,
    forgotPassword
 } = require('../controllers').userController;

router.get('/info/:id', passport.authenticate('jwt', {session: false}), catchErrors(getUserInfo));
router.get('/posts', catchErrors(getAllPosts));
router.get('/supplements', catchErrors(getAllSupplements));
router.post('/authenticate', catchErrors(authenticate))
router.post('/changePassword', passport.authenticate('jwt', {session: false}), catchErrors(changePassword))
router.get('/forgotPassword/:email', forgotPassword)

module.exports = router;