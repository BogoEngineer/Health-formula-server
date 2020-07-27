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

// Delete phase linked with user when user is deleted
PhaseSchema.pre('remove', async function(next){
    let id = this.supplement_plan;
    await this.model('SupplementPlan').findByIdAndDelete(id); // mora remove, mozda ne
    next();
});

var model = mongoose.model('Phase', PhaseSchema);
model.collection.name = 'Phase';
module.exports = model;