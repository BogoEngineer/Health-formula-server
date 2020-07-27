'use strict';
const db = require('../models');
const mongoose = require('mongoose');

exports.getAllUsers = async(req,res) => {
    let users = await db.User.find({
        admin: false
    }).populate({
        path : 'phase',
        model: 'Phase',
        populate : {
          path : 'supplement_plan',
          model: 'SupplementPlan',
          populate : {
            path : 'before_breakfast after_breakfast am_snack before_lunch after_lunch pm_snack before_dinner after_dinner',
            model: 'Supplement'  
          }
        }
    }).populate({
        path: 'phase',
        model: 'Phase',
        populate : {
            path : 'food_choice',
            model: 'FoodChoice',
            populate : {
                path : 'allowed not_allowed',
                model: 'FoodItem'
            }
        }
    }).populate({
        path : 'phase',
        model: 'Phase',
        populate : {
            path : 'meal_plan',
            model: 'MealPlan'
        }
    });
    res.status(200).json({
        success: true,
        data: users
    })
}

exports.getAllMealPlans = async(req, res) => {
    let meal_plans = await db.MealPlan.find();
    res.status(200).json({
        success: true,
        data: meal_plans
    })
}

exports.getAllFoodChoices = async(req,res) => {
    let food_choices = await db.FoodChoice.find().populate('allowed').populate('not_allowed');
    res.status(200).json({
        success: true,
        data: food_choices
    })
}

exports.getAllSupplements = async(req,res) => {
    let supplements = await db.Supplement.find();
    res.status(200).json({
        success: true,
        data: supplements
    })
}

exports.getAllFoodItems = async(req,res) => {
    let food_items = await db.FoodItem.find();
    res.status(200).json({
        success: true,
        data: food_items
    })
}

exports.createNewUser = async(req,res) => {
    let user_data = req.body;
    user_data.date_created = Date.now();
    let user = await db.User.create(user_data);
    res.status(201).json({
        success: true,
        data: user
    })}

exports.createNewPhase = async(req,res) => {
    let phase_data = req.body;
    let phase = await db.Phase.create(phase_data);
    return res.status(201).json({
        success: true,
        data: phase
    });
}

exports.createNewSupplementPlan = async(req,res) => {
    let supplement_plan_data = req.body;
    let supplement_plan = await db.SupplementPlan.create(supplement_plan_data);
    res.status(201).json({
        success: true,
        data: supplement_plan
    })}

exports.createNewMealPlan = async(req,res) => {
    let meal_plan_data = req.body;
    let meal_plan = await db.MealPlan.create(meal_plan_data);
    res.status(201).json({
        success: true,
        data: meal_plan
    })}

exports.createNewFoodChoice = async(req,res) => {
    let food_choice_data = req.body;
    let food_choice = await db.FoodChoice.create(food_choice_data);
    res.status(201).json({
        success: true,
        data: food_choice
    })}

exports.createNewSupplement = async(req,res) => {
    let supplement_data = req.body;
    let supplement = await db.Supplement.create(supplement_data);
    res.status(201).json({
        success: true,
        data: supplement
    })
}

exports.createNewFoodItem = async(req,res) => {
    let food_item_data = req.body;
    let food_item = await db.FoodItem.create(food_item_data);
    res.status(201).json({
        success: true,
        data: food_item
    })}

exports.createNewPost = async(req,res) => {
    let post_data = req.body;
    let post = await db.Post.create(post_data);
    res.status(201).json({
        success: true,
        data: post
    })}

exports.deleteUser = async(req,res) => {
    let user_id = req.params.id;
    let user = await db.User.findById(user_id);
    user.remove();
    res.status(200).json({
        success: true,
        data: user
    })
}

exports.deleteMealPlan = async(req,res) => {
    let meal_plan_id = req.params.id;
    let meal_plan = await db.MealPlan.findById(meal_plan_id);
    meal_plan.remove();
    res.status(200).json({
        success: true,
        data: meal_plan
    })
}

exports.deleteSupplement = async(req,res) => {
    let supplement_id = req.params.id;
    let supplement = await db.Supplement.findById(supplement_id);
    supplement.remove();
    res.status(200).json({
        success: true,
        data: supplement
    })}

exports.deleteFoodItem = async(req,res) => {
    let food_item_id = req.params.id;
    let food_item = await db.User.findById(food_item_id);
    food_item.remove();
    res.status(200).json({
        success: true,
        data: food_item
    })}

exports.updateUser = async(req,res) => {
    let user_id = req.params.id;
    let phase_id = req.body.id;
    let user = await db.User.findByIdAndUpdate(user_id, {
        phase: phase_id
    });
    res.status(200).json({
        success: true,
        data: user
    })}


