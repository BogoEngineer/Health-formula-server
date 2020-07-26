'use strict';

require('dotenv').config();
const url = require('url');

const { DATABASE_URL, PORT } = process.env;

const db = new url.URL(DATABASE_URL);

db.database = db.pathname.split('/')[1];


const config = {
    [process.env.NODE_ENV]: {
        db: db,
    },
    mongooseOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        // useFindAndModify: false,
        // autoIndex: false, // Don't build indexes
        // poolSize: 10, // Maintain up to 10 socket connections
        // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        // family: 4 // Use IPv4, skip trying IPv6
      }
};
// console.log(config);
module.exports = config;