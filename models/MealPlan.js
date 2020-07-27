const mongoose = require('mongoose');

const MealPlanSchema = new mongoose.Schema({
    name: {
        type: JSON,
        required: 'Name is required'
    },
    description: {
        type: String
    }
}, 
    {
        versionKey: false
    }
);

// Delete every reference to meal plan that is going to be removed  (from phase)
MealPlanSchema.pre('remove', async function(next){
    let id = this._id;
    await this.model('Phase').updateMany(
        {meal_plan: id},
        {$set: {meal_plan: null}}
    );
});

var model = mongoose.model('MealPlan', MealPlanSchema);
model.collection.name = 'MealPlan';
module.exports = model;