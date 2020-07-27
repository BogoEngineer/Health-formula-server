const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

const router = require('./routes');

//const MongoStore = require('connect-mongo')(session);
const path = require('path');
//const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');
const passport = require('passport');
//const promisify = require('es6-promisify');
//const expressValidator = require('express-validator');
const routes = require('./routes/index');
//const helpers = require('./helpers');
const errorHandlers = require('./utils/errors');
//require('./handlers/passport');

const app = express();

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());

// Mount routers
app.use('/admin', router.admin);
app.use('/user', router.user)

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
    /* Development Error Handler - Prints stack trace */
    app.use(errorHandlers.developmentErrors);
  }

// production error handler
app.use(errorHandlers.productionErrors);

const port = process.env.PORT || 3000;

const server = app.listen(port, console.log(`Server is listening on port: ${port}`));