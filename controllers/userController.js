'use strict';

const db = require('../models');

module.exports = {
    getUserInfo,
    getAllPosts,
}

async function getUserInfo(req, res, next) {
    let user_id = req.params.id;
    let user_info = await db
                            .User
                            .findById(user_id)
                            .populate({
                                path: 'phase',
                                model: 'Phase',
                                populate: {
                                    path: 'supplement_plan',
                                    model: 'Supplement plan',
                                },
                                populate : {
                                    path : 'food_choice',
                                    model: 'FoodChoice',
                                    populate : {
                                        path : 'allowed',
                                        model: 'FoodItem'
                                    },
                                    populate : {
                                        path : 'not_allowed',
                                        model: 'FoodItem'
                                    }
                                },
                                populate : {
                                    path : 'meal_plan',
                                    model: 'MealPlan'
                                }
                            });
    res.status(200).json({
        success: true,
        data: user_info,
    });
}

async function getAllPosts(req, res, next) {
    let allPost = await db.Post.find();
    res.status(200).json({
        success: true,
        data: allPost,
    });
}
