const express = require('express');
const path = require('path'); 
const fs = require('fs'); 
const mongo = require('mongodb');
const new_db = "mongodb://localhost:27017/admin";
const bodyParser = require('body-parser');
const crypto = require('crypto');
root =__dirname+'/public/themes/startbootstrap-modern-business-gh-pages';

const app = express();

app.use(express.static(root));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended:true
}));
// to serve the JavaScript, CSS and index.html
app.get('/', (req,res)=>{
    res.set({
		'Access-Control-Allow-Origin' : '*'
	});
    // console.log("Hit Endpoint")
    // res.sendFile(root+'/index.html');
return res.redirect(root+'/index.html');
}).listen(3000);
const getHash = ( pass ,  userId ) => {
				
    const hash = crypto.createHmac('sha512', userId.toString()).digest('hex');
    console.log({pass});
    //passing the data to be hashed
     hash.update(pass);
    //Creating the hmac in the required format
    gen_hmac= hash.digest('hex');
    //Printing the output on the console
    console.log("hmac : " + gen_hmac);
    return gen_hmac;
}

app.post('/sign_up' ,function(req,res){

    console.log({body:req.body});

    const first = req.body.firstName;
    const last = req.body.lastName;
    const state = req.body.state;
    const addres = req.body.address1;
    const address = req.body.address2;
    const postal = req.body.postal;
    const country = req.body.country;
    const city = req.body.city;
    const email = req.body.email;
    const company = req.body.companyName;
    const phone = req.body.phoneNunber;
    const userId = req.body.userId;
    const pass = req.body.password;
    // const pass1 = req.body.password1;
	// const pass = req.body.phone;
	const password = getHash( pass ,  userId ); 				

	
	const data = {
        "firstName":FirstName,
        "lastName" :LastName,
        "state" :state,
        "address1" :Address1,
        "address2" :Address2,
        "postal" :Postal,
        "country" :Country,
        "city" :city,
        "email" :E-mail,
        "companyName" :CompanyName,
        "phoneNumber" :PhoneNumber,
        "userId" :userId,
		"password": password 
		// "password" : phone
    }
    mongo.connect(admin , function(error , db){
		if (error){
			throw error;
		}
		console.log("connected to database successfully");
		//CREATING A COLLECTION IN MONGODB USING NODE.JS
		db.collection("details").insertOne(data, (err , collection) => {
			if(err) throw err;
			console.log("Record inserted successfully");
			console.log(collection);
		});
	});
	
	console.log("DATA is " + JSON.stringify(data) );
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/success.html');  

});
													
												
// const port = process.env.PORT || 3000;
// app.listen(port, () => 
console.log("Listening at http://localhost:3000");