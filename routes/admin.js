const router = require('express').Router();
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
    deleteSupplement
} = require('../controllers').adminController;

router.route('/users')
    .get(catchErrors(getAllUsers))
    .post(catchErrors(createNewUser))
    .delete(catchErrors(deleteUser))
    .put(catchErrors(updateUser));

router.route('/foodchoices')
    .get(catchErrors(getAllFoodChoices))
    .post(catchErrors(createNewFoodChoice));

router.route('/fooditems')
    .get(catchErrors(getAllFoodItems))
    .post(catchErrors(createNewFoodItem))
    .delete(catchErrors(deleteFoodItem))

router.route('/phases')
    .post(catchErrors(createNewPhase))

router.route('/mealplans')
    .get(catchErrors(getAllMealPlans))
    .post(catchErrors(createNewMealPlan))
    .delete(catchErrors(deleteMealPlan))

router.route('/supplements')
    .get(catchErrors(getAllSupplements))
    .post(catchErrors(createNewSupplement))
    .delete(catchErrors(deleteSupplement));

router.route('/supplementplans')
    .post(catchErrors(createNewSupplementPlan))

router.route('/posts')
    .post(catchErrors(createNewPost));

module.exports = router;