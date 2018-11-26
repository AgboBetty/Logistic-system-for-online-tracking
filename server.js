const express = require('express');
const path = require('path'); 
const fs = require('fs');
const bcrypt = require('bcrypt');
const userdb = require('userdb');
// const compass = require('compass');
const mongo = require('mongodb');
// const new_db = "mongodb://localhost:27017/admin";
const bodyParser = require('body-parser');
const crypto = require('crypto');
root =__dirname+'/public/themes/startbootstrap-modern-business-gh-pages';

const mongoose = require('mongoose');
let dbUrl = "mongodb://localhost:27017/admin";

let mongoDb = dbUrl;

mongoose.connect(mongoDb);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error",console.error.bind(console,"MongoDB COnnection error:"));

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
// user.save().then(user => {console.log(user)})
// .catch(err => {console.log(err)});

const app = express();

app.use(express.static(root));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended:true
}));

var BCRYPT_SALT_ROUNDS = 12;
app.post("/sign_up", (req, res) => {
    var myData = new User(req.body);
    myData.save()
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
    .then(function(hashedPassword) {
        return userdb.saveUser(userId, hashedPassword);
    })
    .then(function() {
        res.send();
    })
    .catch(function(error){
        console.log("Error saving user: ");
        console.log(error);
        next();
    });
});
app.post('/login', function (req, res, next) { 
    var username = req.body.userId;
    var password = req.body.password;
  
    userdb.getUserByuserId(userId)
      .then(function(user) {
          return bcrypt.compare(password, user.password);
      })
      .then(function(samePassword) {
          if(!samePassword) {
              res.status(403).send();
          }
          res.send();
      })
      .catch(function(error){
          console.log("Error authenticating user: ");
          console.log(error);
          next();
      });
  });
  
    //   .then(item => {
    //      res.send("successfully saved to database");
    //    })
    //    .catch(err => {
    //      res.status(400).send("unable to save to database");
    //   });
  //});
// to serve the JavaScript, CSS and index.html
app.get('/', (req,res)=>{
    res.set({
		'Access-Control-Allow-Origin' : '*'
    });
    // return res.redirect('/public//themes/startbootstrap-modern-business-gh-pages/success.html');  

// });
    // console.log("Hit Endpoint")
    // res.sendFile(root+'/index.html');
return res.redirect(root+'/index.html');
}).listen(3000);

// const getHash = ( pass ,  phone ) => {
				
//     const hash = crypto.createHmac('sha512', phone);
//     console.log({pass});
//     //passing the data to be hashed
//      hash.update(pass);
//     //Creating the hmac in the required format
//     gen_hmac= hash.digest('hex');
//     //Printing the output on the console
//     console.log("hmac : " + gen_hmac);
//     return gen_hmac;
// }

// app.post('/sign_up' ,function(req,res){

//     console.log({body:req.body});

//     const first = req.body.firstName;
//     const last = req.body.lastName;
//     const state = req.body.state;
//     const addres = req.body.address1;
//     const address = req.body.address2;
//     const postal = req.body.postal;
//     const country = req.body.country;
//     const city = req.body.city;
//     const email = req.body.email;
//     const company = req.body.companyName;
//     const phone = req.body.phone;
//     const userId = req.body.userId;
//     const pass = req.body.password;
//     // const pass1 = req.body.password1;
// 	// const pass = req.body.phone;
// 	const password = getHash( pass ,  phone ); 				

	
// 	const data = {
//         "firstName":AGBO,
//         "lastName" :Laura,
//         "state" :enugu,
//         "address1" :Adurestreet,
//         "address2" :gbenustreet,
//         "postal" :41600,
//         "country" :nigeria,
//         "city" :enugu,
//         "email" :'bettyagbo002@gmail.com',
//         "companyName" :ugarsoft,
//         "phone" :08138543365,
//         "userId" :12345,
// 		"password": favour 
// 		// "password" : phone
//     }
//     const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/admin");
    // mongo.connect(admin , function(error , db){
	// 	if (error){
	// 		throw error;
	// 	}
	// 	console.log("connected to database successfully");
	// 	//CREATING A COLLECTION IN MONGODB USING NODE.JS
	// 	db.collection("details").insertOne(data, (err , collection) => {
	// 		if(err) throw err;
	// 		console.log("Record inserted successfully");
	// 		console.log(collection);
	// 	});
	// });
	
// 	console.log("DATA is " + JSON.stringify(data) );
// 	res.set({
// 		'Access-Control-Allow-Origin' : '*'
// 	});
// 	return res.redirect('/public/success.html');  

// });
													
												
// const port = process.env.PORT || 3000;
// app.listen(port, () => 
console.log("Listening at http://localhost:3000");