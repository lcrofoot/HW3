var express = require('express'); // remember to install these in the top directory to fill in 
var path = require('path');      // your package.json, as well as anything else you want to add
var app = express();
app.use(express.static('../public/'));
var database = require('./database.json');
var CryptoJS=require("crypto-js");
var AES=require("crypto-js/aes");
var SHA256=require("crypto-js/sha256");
// Don't change anything above this line unless you know what it will do


app.get('/',function(req,res){
    // Right now this does nothing. To send the index file from the public directory follow the methods in the class example
    // You will need to add the path to the index file public/index.html since we have a slightly more complex set up now.
    res.sendFile(path.join(__dirname + '/index.html'));
});

//check username and password with list of users in database.json 
app.get('/users/:username/pw/:password',function(req,res){
    //save user and password from form
    var user = req.params.username;
    var password = req.params.password;

    //check form-submitted values with database 
    for (var i = 0; i < database.length; i++) {
        console.log(database[i].Username);
        if (user == database[i].Username){
            console.log(database[i].password);
            console.log(password);
            if (password == database[i].password) {
                // define object to be passed to frontEnd 
                object = {Username: user, FirstName: database[i].FirstName, LastName: database[i].LastName};
                res.send(object); // send username, first name and last name to front end 
                console.log("match!");
                break;   // exit loop once a match is found
            }
            else { // if a user is found but the password doesn't match
                console.log("wrong password")
                res.send('{}'); // send no result 
                break;
            }
        }
    }
    
    console.log('i=', i)
    if (i == database.length){ // if it goes through the whole loop but no user is found
        console.log("wrong username");
        res.send('{}'); // send no result
    }
 
});

// How to integrate Crytpo.JS ? ... Ask in class 
var mystring = 'this is my string bla';
var myPassword = 'myPassword';
// test encryption 

var encrypted = CryptoJS.AES.encrypt(mystring, myPassword)
var decrypted = CryptoJS.AES.decrypt(encrypted, myPassword)
console.log(mystring)
console.log(encrypted)
console.log(decrypted)
console.log(decrypted.toString(CryptoJS.enc.Utf8))

console.log(mystring==decrypted.toString(CryptoJS.enc.Utf8))

app.listen(8080);