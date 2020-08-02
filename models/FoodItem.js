const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ""
    }
}, 
    {
        versionKey: false
    }
);

// Delete every reference to food item that is going to be removed  (from food choice)
FoodItemSchema.pre('remove', async function(next){
    let id = this._id;
    console.log(id);
    await this.model('FoodChoice').updateMany({},
        { $pull: { 
                allowed: id,
                not_allowed: id
                } 
        },
        { multi: true })
});

var model = mongoose.model('FoodItem', FoodItemSchema);
model.collection.name = 'FoodItem';
module.exports = model;