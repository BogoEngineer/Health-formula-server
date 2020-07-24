const mongoose = require('mongoose');

const SupplementSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true
    },
    manufacturer: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ""
    }
}, 
    {
        versionKey:false
    }
);

// Delete every reference to supplement that is going to be removed  (from supplement plan)
SupplementSchema.pre('remove', async function(next){
    let id = this.getQuery()._id;
    await this.model('SupplementPlan').update({},
        { $pull: { 
                before_breakfast: id, 
                after_breakfast: id, 
                am_snack: id,
                before_lunch: id,
                after_lunch: id,
                pm_snack: id,
                before_dinner: id,
                after_dinner: id
                } 
        },
        { multi: true })
});

var model = mongoose.model('Supplement', SupplementSchema);
model.collection.name = 'Supplement';
module.exports = model;