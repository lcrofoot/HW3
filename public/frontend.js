// Use this file to add all of the functionality to the website including the XMLHttpRequests. 
// You may use the class examples for references as the XMLHttpRequests always follow the same pattern for the kind of
// work we will be using them for. Remeber google is your friend!

var httpGet = function(theUrl)
{
    console.log(theUrl);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        console.log(xmlHttp.responseText);
        var res_object = JSON.parse(xmlHttp.responseText);
        console.log(res_object);
        if (res_object.Username){
            //document.location.href='/UserPage.html'; // why is it not doing anything after this
            console.log(res_object.Username) // isn't running
            document.getElementById('user').innerText="Hi "+ res_object.FirstName + " " + res_object.LastName  // isn't running
            document.getElementById('title').style.display = "none"
            document.getElementById('username').style.display = "none"
            document.getElementById('password').style.display = "none"
            document.getElementById('button').style.display = "none"
        }

        else{
            document.getElementById('user').innerHTML= '<h1>Access Denied</h1>';
        }
    }
    xmlHttp.open("GET", theUrl, false); 
    xmlHttp.send();
}

var getUser = function(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log('username', username) 
    console.log('password', password) 
    var theURL = '/users/'+ username+ '/pw/'+password;
    httpGet(theURL);
};