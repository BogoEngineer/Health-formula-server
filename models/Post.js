const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        trim: true,
        default: ""
    },
    image: { 
        data: Buffer, 
        contentType: String 
    } 
}, 
    {
        versionKey: false
    }
);

var model = mongoose.model('Post', PostSchema);
model.collection.name = 'Post';
module.exports = model;