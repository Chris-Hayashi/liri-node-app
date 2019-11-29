//Read and set any environment variables with the dotenv package
require("dotenv").config();

//import the axios package
var axios = require("axios");

//import the fs package
var fs = require("file-system");

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

function searchConcert(artist) {
    if (artist === undefined)
        return console.log("You did not enter an artist");

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
        })
        .catch(function(error) {
            console.log("There are no upcoming concerts for that artist.");
        });
}

function searchSong(song) {

    if (song === undefined) {
        searchSong("The Sign Ace of Base");
    }

    else {
        spotify.search({
            type: "track",
            query: song
            // limit: 1
        }, function(error, response) {

            if (error) {
                console.log("That song does not exist on spotify.");

            } else {
                console.log("Artist: " + response.tracks.items[0].album.artists[0].name);
                console.log("Song: " + response.tracks.items[0].name);
                console.log("Preview Link: " + response.tracks.items[0].external_urls.spotify);
                console.log("Album: " + response.tracks.items[0].album.name);
            }
        });
}
}

function searchMovie(movie) {

    if (movie === undefined)
        searchMovie("Mr. Nobody");
    else {

        var name = movie.split(" ").join("+");
        
        axios.get("http://www.omdbapi.com/?t=" + name + "&apikey=9f733008")
        .then(function(response) {
            console.log("Movie: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
            console.log("Produced in: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        });
    }
}

//if the command is equal to "concert-this"
if (command === "concert-this") {
    
    //Store the artist entered by the user
    var artist = process.argv[3];

    searchConcert(artist);
}

else if (command === "spotify-this-song") {

    //store the name of the song
    var song = process.argv[3];

    searchSong(song);
}

else if (command === "movie-this") {

    //store the name of the movie
    var movie = process.argv[3];

    searchMovie(movie);
}

else if (command === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function(error, contents) {

        if(error) {
            return console.log("Error occurred: " + error);
        }

        var text = contents.split(",");
        var textCommand = text[0];
        var textName = text[1];

        if (textCommand === "concert-this")
            searchConcert(textName);
        else if (textCommand === "spotify-this-song")
            searchSong(textName);
        else if (textCommand === "movie-this")
            searchMovie(textName);
    });
}