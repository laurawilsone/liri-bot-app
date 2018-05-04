
require("dotenv").config();

var keys = require("./keys.js");
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var userCommand = process.argv;
var secondCommand = process.argv[2];
var userInput = '';

for(i=3; i<process.argv.length; i++){
    if(i>3 && i<nodeArgv.length){
        userInput += " " + userCommand[i];
    }
}

switch(secondCommand){
    case 'my-tweets':
    showTweets();
    break;

     case 'spotify-this-song':
     if(userInput) 
         spotifySong(userInput);
    break;

     case 'movie-this':
     if(userInput) 
         movie(userInput);
     break;

     case 'do-what-it-says':
     text(userInput);
     break;

     default:
        console.log("Please enter a command: my-tweets, spotify-this-song, or movie-this");
    break;
    
}

function showTweets() {
    // var client = new Twitter(keys.twitter);
     var parameters = {screen_name: 'laura_wils204', count: 20};
     client.get('statuses/user_timeline', parameters, function(error, tweets, response){
                   if(!error) {
                    for(i = 0; i < tweets.length; i ++){
                     //    var date = tweet[i].create_at;
                        var tweetText = tweets[i].text;
                        console.log("You Tweeted: " + tweetText);
                     //    console.log("On This Date/Time: " + dateTweeted.substring(0, 19));
                         console.log("====================================");
                      };
                    } else {
                      console.log('Error!');                   
                };
             });
 
         }

function spotifySong(userInput){
    console.log("Music for DAYS!");
        
    //launch spotify search
    Spotify.search({ type: 'track', query: userInput, limit: 5}, function(err, data) {
        if(err){
            return console.log("error");
    };
            for(var i = 0; i < data.tracks.items.length; i++) {
                var trackData = data.tracks.items[i];
                  
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Preview Here: " + data.tracks.items[0].preview_url);
        };
    });
};

function movie(userInput){
        
    //same as above, test if search term entered

    var url = 'http://www.omdbapi.com/?t=' + searchMovie +'&y=&plot=short&apikey=trilogy';
       request(url, function(error, response, body){
        if(!error && response.statusCode == 200){

            var movieInfo = JSON.parse(body);
            console.log(movieInfo);

            console.log("Title: " + JSON.parse(body)["Title"]);
            console.log("Year: " + JSON.parse(body)["Year"]);
            console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
            console.log("Country: " + JSON.parse(body)["Country"]);
            console.log("Language: " + JSON.parse(body)["Language"]);
            console.log("Plot: " + JSON.parse(body)["Plot"]);
            console.log("Actors: " + JSON.parse(body)["Actors"]);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
            console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
        };
   });
};//end movie

// text
function text () {

    fs.readFile("random.txt", "utf8", function(error, data) {
              
        var fileData = data.split(",");
            console.log(fileData);
                 
              
        //    spotifySong(txt[1]);
    
        });
    
    };//end of text