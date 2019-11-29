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

console.log("");

//if the command is equal to "concert-this"
if (command === "concert-this") {
    
    //Store the artist entered by the user
    var artist = process.argv[3];

    //perform a get request on axios using bandsintown
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function(response) {

        //then console log the venue
        console.log("Venue: " + response.data[0].venue.name);
        
        //console log the location
        console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
        
        //retrieve the datetime of the event
        var date = (response.data[0].datetime).split("T");
        
        //retrieve only the date of the event
        date = date[0];

        //convert the format of the date using moment.js
        date = moment(date).format("MM/DD/YYYY");

        //console log the formatted date
        console.log("Date: " + date);
    });
}

else if (command === "spotify-this-song") {

    //store the name of the song
    var song = process.argv[3];

    spotify.search({
        type: "track",
        query: song,
        limit: 1
    }, function(error, response) {

        if (error) {
            return console.log("Error occurred: " + error);
        }

        console.log("Artist: " + response.tracks.items[0].album.artists[0].name);
        console.log("Song: " + response.tracks.items[0].name);
        console.log("Preview Link: " + response.tracks.items[0].external_urls.spotify);
        console.log("Album: " + response.tracks.items[0].album.name);
    });
}