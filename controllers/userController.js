'use strict';

const db = require('../models');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/index');

module.exports = {
    getUserInfo,
    getAllPosts,
    getAllSupplements,
    authenticate
}

async function getUserInfo(req, res, next) {
    let user_id = req.params.id;
    let user_info = await db
                            .User
                            .findById(user_id)
                            .populate({
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

async function getAllSupplements(req,res) {
    let supplements = await db.Supplement.find();
    res.status(200).json({
        success: true,
        data: supplements
    })
}

async function authenticate(req, res, next){
    const email = req.body.email;
    const password = req.body.password;


    const user = await db.User.findOne({email: email})

    if(user == null){
        return res.json({success: false, msg: "There is no user with given email"})
    }

    bcrypt.compare(password, user.password, (err, isMatch)=>{
        if(err) {
            res.json({ success: false, msg: 'Couldn`t login' });
        }
        else if(isMatch){
            // const token = jwt.sign({data: user}, config.secret, {
            //     expiresIn: 604800 // 1 week
            // })
            const token = jwt.sign({ data: user }, config.secret, {
                expiresIn: 604800 // 1 week
              });
            user.password = ""
            res.json({
                success: true,
                token: `Bearer ${token}`,
                userId: user._id
              });
            } else {
              return res.json({ success: false, msg: 'Wrong password' });
            }
    })
}