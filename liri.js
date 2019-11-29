//Read and set any environment variables with the dotenv package
require("dotenv").config();

//import the axios package
var axios = require("axios");

//import the moment package
var moment = require("moment");

//import the node-spotify-api package
var Spotify = require("node-spotify-api");

//import the keys.js file and store it in a variable
var keys = require("./keys.js");

//create a new spotify object using the api key and secret
var spotify = new Spotify(keys.spotify);

//Store the command entered by the user
var command = process.argv[2];

//Store the artist entered by the user
var artist = process.argv[3];

//if the command is equal to "concert-this"
if (command === "concert-this") {
    
    //perform a get request on axios using bandsintown
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function(response) {

        //console log the response
        console.log(response.data[0]);

        //then console log the venue
        console.log("Venue: " + response.data[0].venue.name);
        
        //console log the location
        console.log("Location: " + response.data[0].venue.city + ", ");
        
        //retrieve the datetime of the event
        var date = response.data[0].datetime.split("T");
        
        //retrieve only the date of the event
        date = date[0];

        //convert the format of the date using moment.js
        date = moment(date).format("MM/DD/YYYY");

        //console log the formatted date
        console.log("Date: " + date);
    });
}