const mongoose = require('mongoose');

const FoodChoiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    allowed: {
        type: [mongoose.Schema.ObjectId],
        ref: 'FoodItem',
        default: []
    },
    not_allowed: {
        type: [mongoose.Schema.ObjectId],
        ref: 'FoodItem',
        default: []
    }
}, {
    versionKey: false
});

// Delete every reference to food choice that is going to be removed  (from phase)
FoodChoiceSchema.pre('remove', async function(next){
    let id = this.getQuery()._id;
    await this.model('Phase').update(
        {food_choice: id},
        {$set: {food_choice: null}}
    );
});

var model = mongoose.model('FoodChoice', FoodChoiceSchema);
model.collection.name = 'FoodChoice';
module.exports = model;