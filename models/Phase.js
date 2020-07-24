const mongoose = require('mongoose')

const PhaseSchema = new mongoose.Schema({
    exception: {
        type: String,
        trim: true,
        default: ""
    },
    phase_number: {
        type: Number,
        enum: [1, 2, 3]
    },
    supplement_plan: {
        type: mongoose.Schema.ObjectId,
        ref: 'SupplementPlan'
    },
    food_choice: {
        type: mongoose.Schema.ObjectId,
        ref: 'FoodChoice'
    },
    meal_plan: {
        type: mongoose.Schema.ObjectId,
        ref: 'MealPlan'
    }
},
    {
        versionKey: false
    }
);

var model = mongoose.model('Phase', PhaseSchema);
model.collection.name = 'Phase';
module.exports = model;