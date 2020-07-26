// Creating and exporting model schemas

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const {
  CONNECTION_STRING
} = process.env;


/**mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);**/

const basename = path.basename(__filename);
var db = {}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = require(path.join(__dirname,file));
    db[model.name] = model;
  });

module.exports = db;