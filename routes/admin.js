const router = require('express').Router();
const passport = require('passport');

const { catchErrors } = require('../utils/errors');

const {
    getAllFoodChoices,
    getAllFoodItems,
    getAllMealPlans,
    getAllSupplements,
    getAllUsers,
    createNewFoodChoice,
    createNewFoodItem,
    createNewMealPlan,
    createNewPhase,
    createNewPost,
    createNewSupplement,
    createNewSupplementPlan,
    createNewUser,
    updateUser,
    deleteUser,
    deleteFoodItem,
    deleteMealPlan,
    deleteSupplement,
    deleteFoodChoice,
    authenticate
} = require('../controllers').adminController;

router.route('/users')
    .get(passport.authenticate('jwt', {session: false}), catchErrors(getAllUsers))
    .post(passport.authenticate('jwt', {session: false}), catchErrors(createNewUser));

router.route('/users/:id')
    .delete(passport.authenticate('jwt', {session: false}), catchErrors(deleteUser))
    .put(passport.authenticate('jwt', {session: false}), catchErrors(updateUser));

router.route('/foodchoices')
    .get(passport.authenticate('jwt', {session: false}), catchErrors(getAllFoodChoices))
    .post(passport.authenticate('jwt', {session: false}), catchErrors(createNewFoodChoice));

router.route('/foodchoices/:id')
    .delete(passport.authenticate('jwt', {session: false}), catchErrors(deleteFoodChoice))

router.route('/fooditems')
    .get(passport.authenticate('jwt', {session: false}), catchErrors(getAllFoodItems))
    .post(passport.authenticate('jwt', {session: false}), catchErrors(createNewFoodItem));

router.route('/fooditems/:id')
    .delete(passport.authenticate('jwt', {session: false}), catchErrors(deleteFoodItem));

router.route('/phases')
    .post(passport.authenticate('jwt', {session: false}), catchErrors(createNewPhase));

router.route('/mealplans')
    .get(passport.authenticate('jwt', {session: false}), catchErrors(getAllMealPlans))
    .post(passport.authenticate('jwt', {session: false}), catchErrors(createNewMealPlan));

router.route('/mealplans/:id')
    .delete(passport.authenticate('jwt', {session: false}), catchErrors(deleteMealPlan));

router.route('/supplements')
    .get(passport.authenticate('jwt', {session: false}), catchErrors(getAllSupplements))
    .post(passport.authenticate('jwt', {session: false}), catchErrors(createNewSupplement));

router.route('/supplements/:id')
    .delete(passport.authenticate('jwt', {session: false}), catchErrors(deleteSupplement));

router.route('/supplementplans')
    .post(passport.authenticate('jwt', {session: false}), catchErrors(createNewSupplementPlan));

router.route('/posts')
    .post(passport.authenticate('jwt', {session: false}), catchErrors(createNewPost));


router.route('/authenticate')
    .post(catchErrors(authenticate))

module.exports = router;