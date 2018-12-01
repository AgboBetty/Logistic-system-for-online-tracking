const express = require('express');
const path = require('path'); 
const fs = require('fs');
var port     = process.env.PORT || 3000;
const app = express()
const bcrypt = require('bcrypt');
const userdb = require('userdb');
const mongo = require('mongodb');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const passport = require('passport');
const flash    = require('connect-flash');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
// const bodyParser   = require('body-parser');
const session      = require('express-session');
const configDB = require('./config/database.js');
const mongoose = require('mongoose');
// let dbUrl = "mongodb://localhost:27017/admin";
// let mongoDb = dbUrl;
// mongoose.connect(mongoDb);
mongoose.connect(configDB.url);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error",console.error.bind(console,"MongoDB COnnection error:"));

// root =__dirname+'/public/themes/startbootstrap-modern-business-gh-pages';

var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    state: String,
    address1: String,
    address2 :String,
    postal: String,
    country:String,
    city: String,
    email:  { type: String, unique: true },
    companyName: String,
    phone: String,
    userId:String,
    password: {
        type: String,
        required: true
      },
    password1: String
});
var User = mongoose.model("User", nameSchema);

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

 root ='/public/themes/startbootstrap-modern-business-gh-pages';
 app.use(express.static('/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended:true
}));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
// app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================

// var BCRYPT_SALT_ROUNDS = 12;
// var password = req.body.password;
app.post("/sign_up", (req, res) =>{
    
    var myData = new User(req.body);
    // console.log(req.body);
  myData.save()
    .then(item => {
        // console.log('item');
              res.send("successfully saved to database");
            })
            .catch(err => {
             res.status(400).send("unable to save to database");
           });
      });
    
// to serve the JavaScript, CSS and index.html
// app.get('/', (req,res)=>{
//     res.set({
// 		'Access-Control-Allow-Origin' : '*'
//     });
   
// return res.redirect(root+'/index.html');
// }).listen(3000);


console.log("Listening at http://localhost:3000");