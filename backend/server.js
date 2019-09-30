var express = require('express'); // remember to install these in the top directory to fill in 
var path = require('path');      // your package.json, as well as anything else you want to add
var app = express();
app.use(express.static('../public/'));
var database = require('./database.json');
// Don't change anything above this line unless you know what it will do


app.get('/',function(req,res){
    // Right now this does nothing. To send the index file from the public directory follow the methods in the class example
    // You will need to add the path to the index file public/index.html since we have a slightly more complex set up now.
    res.sendFile(path.join(__dirname + '/index.html'));
});

//You will need to add more routes than just '/' so that your website can talk to your webserver using the get XMLHttpRequests
app.get('/users/:username/pw/:password',function(req,res){

    var user = req.params.username;
    var password = req.params.password;
    object = {Username: user, password: password}
    console.log(object)

    for (var i = 0; i < database.length; i++) {
        console.log(database[i].Username)
        if (user == database[i].Username){
            console.log(database[i].password)
            console.log(object.password)
            if (password == database[i].password) {
                //document.location.href = path.join(__dirname, '../' + 'public/UserPage.html');
                //res.sendFile(path.join(__dirname, '../' + 'public/UserPage.html')); // how do I send the username data to the page? 
                res.send("match") // why does it only do this line instead of sendFile above if I have both?
                console.log("match!")
                // go to user page 
                // how do I get rid of the stuff on this page and start a new page? 
                break   
            }
            else {
                console.log("wrong password")
                //res.send("wrongpass")
                res.sendFile(path.join(__dirname, '../' + 'public/AccessDenied.html'));
                break
            }
        }
    }
    
    console.log('i=', i)
    if (i == database.length){
        console.log("wrong username")
        res.send("wrongusername")
        //res.sendFile(path.join(__dirname, '../' + 'public/AccessDenied.html'));
    }
        //res.send('<h1> Hello '+user+'</h1>');
 
});

// app.get('/users/:username',function(req,res){

//     res.sendFile(path.join(__dirname, '../' + 'public/AccessDenied.html'));

// });
app.listen(8080);