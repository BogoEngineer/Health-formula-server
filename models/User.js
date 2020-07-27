const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String
    },
    first_name: {
        type: String,
        trim: true
    },
    last_name: {
        type: String,
        trim: true
    },
    date_created: {
        type: Date
    },
    phase: {
        type: mongoose.Schema.ObjectId,
        ref: 'Phase'
    },
    profile_picture: { 
        data: Buffer, 
        contentType: String 
    },
    admin: {
        type: Boolean,
        default: false
    } 
}, 
    {
        versionKey: false
    }
);

// Delete phase linked with user when user is deleted
UserSchema.pre('remove', async function(next){
    let id = this.phase;
    await this.model('Phase').findByIdAndDelete(id); // treba remove mzd
    next()
});

var model = mongoose.model('User', UserSchema);
model.collection.name = 'User';
module.exports = model;
