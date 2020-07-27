'use strict';

const url = require('url');
const path = require('path');
const fs = require('fs');
const Mongoose = require('mongoose');
const { mongooseOptions } = require('../config');

const { DATABASE_URL } = process.env;

// Connecting to mongoDB
Mongoose.connect(DATABASE_URL, mongooseOptions, (err) => {
    if(err !== null) {
        console.log(err);
    } else {
        console.log("Successfully connected to database!\n");
    }
});


// Adding models to common export for dir
const basename = path.basename(__filename);
var database = {};
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        var model = require('./' + file.split('.')[0]);
        database[model.collection.name] = model;
    });

module.exports = database;
