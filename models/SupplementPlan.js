const mongoose = require('mongoose');

const SupplementPlanSchema = new mongoose.Schema({
    before_breakfast: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Supplement'
    },
    after_breakfast: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Supplement'
    },
    am_snack: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Supplement'
    },
    before_lunch: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Supplement'
    },
    after_lunch: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Supplement'
    },
    pm_snacl: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Supplement'
    }, 
    before_dinner: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Supplement'
    },
    afetr_dinner: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Supplement'
    }
},
    {
        versionKey: false,
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
);

// Delete every reference to supplement plan that is going to be removed  (from phase)
SupplementPlanSchema.pre('remove', async function(next){
    let id = this.getQuery()._id;
    await this.model('Phase').update(
        {supplement_plan: id},
        {$set: {supplement_plan: null}}
    );
});

var model = mongoose.model('SupplementPlan', SupplementPlanSchema);
model.collection.name = 'SupplementPlan';
module.exports = model;