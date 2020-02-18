const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db.js');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const Config = require('./config/keys.js')[process.env.NODE_ENV];
const colors = require('colors');
const { isEmpty } = require('./helper/index');
const ejs = require('ejs');


const app = express();

const PORT = process.env.PORT || 3030;

// set local values
app.locals.PORT = PORT;

// set path & view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// globally changed
ejs.delimiter = '?';


const sessionSecret = session({
	store: new MongoStore({ url: Config.mongoURI}),
	secret: 'ssssssssssssshhhhhhhhhhhhhphirkoihaiiiii',
	resave: 'true',
	saveUninitialized: true,
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(sessionSecret);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// middleware that accepts the json data from api
app.use(express.json({extends:true}));


// res.locals avaliable in your view engine by default
app.get('*',(req, res, next) => { 
	res.locals.user = req.user || null; 	
	res.locals.isEmpty = isEmpty;
	next(); 
});

// routes
app.use('/', require('./routes/index.js'));

// connect the database then start the server.
connectDB().then(dbResponse => {
    app.listen(PORT, () => {
		console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold)
        console.log(`${dbResponse}`.cyan.underline.bold);
    });
}).catch(err => console.log(`${err}`.underline.red.bold));
