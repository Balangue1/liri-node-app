require("dotenv").config();

//var another = require('keys.js');

var Twitter = require('twitter');
var express = require('express');
var router = express.Router();

// Import the Spotify API
var Spotify = require('node-spotify-api');

// Import our Keys File
var keys = require('./keys.js');

// Create a Spotify Client
var spotify = new Spotify(keys.spotify);
var results = [];

var tweetsArr = [];
var request = require('request');
var fs = require('fs');
var inputCommand = process.argv[2];
var commandParam = process.argv[3];
var client = new Twitter(keys.twitter);

console.log(process.argv[2]);
console.log(process.argv[3]);
console.log(inputCommand);

runCommands();

//function runCommands(command, inputCommand){

function runCommands() {
    //    console.log("enter runCommands function");
    switch (inputCommand) {
        case 'my-tweets':
            //       myTweets()
            myTweets(); break;
        case 'spotify-this-song':
            searchSpotify()
            break;
        case 'movie-this':
            movieThis()
            break;
        case 'do-what-it-says':
            doCommand()
            break;    


    }
};

function myTweets() {
    //    console.log("enter myTweets section");
    client.get('statuses/user_timeline', {
        screen_name: 'Liri Node', count: 20, exclude_replies: true,
        trim_user: true
    }, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
            tweetsArr = tweets;
            for (i = 0; i < tweetsArr.length; i++) {
                console.log("Tweet: " + tweetsArr[i].text);
                console.log("Date Created: " + tweetsArr[i].created_at);
                console.log("--------------------------------");
                console.log();

            }
        }
        else {
            console.log(error);
        }
    });
}

function searchSpotify() {


    //    spotify
    //      .request('https://api.spotify.com/v1/search?q=name:' + process.argv[3] + '&type=track')
    //      .then(function(data) {
    //        console.log("you have ENTERED")  

    //        var tracks = responses.map(function(response) {
    //          return response.items.map(function(item) {
    //            return [
    //              item.track.uri,
    //              item.track.id,
    //              item.track.name,
    //              item.track.artists.map(function(artist) { return artist.name }).join(', '),
    //              item.track.artists.map(function(artist) { return artist.id }).join(', '),
    //              item.track.album.name,
    //              item.track.disc_number,
    //              item.track.track_number,
    //              item.track.duration_ms,
    //              item.added_by == null ? '' : item.added_by.uri,
    //              item.added_at
    //            ].map(function(track) { return '"' + track + '"'; })
    //          });
    //        });

    //       console.log(data); 
    //     })
    //     .catch(function(err) {
    //       console.error('Error occurred: ' + err); 
    //     });

    // spotify.request('https://api.spotify.com/v1/search?q=name:' + process.argv[3] + '&type=track')
    
    //  .then(function(error, data, response) {
    //      if (!error) {
    //          console.log(data);
    //          results = data;
    //          for (i=0; i < results.length; i++) {
    //              console.log("Album: " + results[i].album_type);
    //              console.log("Artist: " + results[i].artist);

    //          }
    //      }
    //    //console.log(data); 
    //  })
    //  .catch(function(err) {
    //    console.error('Error occurred: ' + err); 
    //  });
  



     //-------------------

    // console.log("you have entered SPOTIFY SEARCH FUNCTION");

//    spotify.request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')

      spotify.request('https://api.spotify.com/v1/search?q=name:' + process.argv[3] + '&type=track')
      .then(function (data) {
        console.log("you are in the searchSpotify function");
        for (i = 0; i < tweetsArr.length; i++) {

        console.log(data.tracks.items[i]); 
      
        })
      .catch(function(err) {
        console.error('Error occurred: ' + err); 
      

    });

    //  console.log("enter searchSPOTIFY function");
    //      //Make a request to Spotify
    //      spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
 
    //         if (err) {

    //          return console.log('Error occured: ' + err);
    //      }
    //      console.log(data);
    //  });
 

function movieThis() {
    // Basic Node application for requesting data from the OMDB website
    // Here we incorporate the "request" npm package
    var request = require("request");

    // If no movie is entered, default to "Mr. Nobody"
    if (process.argv[3] === undefined) {
        console.log("undefined here");
        commandParam = "Mr. Nobody";
    };

    // We then run the request module on a URL with a JSON
    request("http://www.omdbapi.com/?t=" + commandParam + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {
            // Print the titlel of the movie
            console.log("Title: " + JSON.parse(body).Title);
            // Print the year the movie came out
            console.log("Year: " + JSON.parse(body).Year);
            // Then we print out the imdbRating
            console.log("IMDB rating: " + JSON.parse(body).imdbRating);
            // Print the Rotten Tomatoes Rating of the movie
            console.log("Rotton Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            // Print the country where the movie was produced
            console.log("Country: " + JSON.parse(body).Country);
            // Print the language of the movie
            console.log("Language: " + JSON.parse(body).Language);
            // Print the plot of the movie
            console.log("Plot: " + JSON.parse(body).Plot);
            // Print actors in the movie
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });

}

function doCommand() {

    fs.readFile('random.txt', 'utf8', function(error, data){
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
    }
    console.log(data);
    console.log("enter this area");
    // We will then print the contents of data
   
    var output = data.split(",");
   
    // We will then re-display the content as an array for later use.
    console.log(output);
    });
   
};
//    spotify.request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')

    // spotify.request('https://api.spotify.com/v1/search?q=name:' + process.argv[3] + '&type=album')
    // .then(function(error, response, body) {
    //   console.log("you are in the searchSpotify function");
    //   console.log(response); 
    // })
    // .catch(function(err) {
    //   console.error('Error occurred: ' + err); 
    // });








    // spotify.search({type: 'track', query:'The Sign'}, function(err, data){
    //   if (err){
    //       return console.log('Error occured: ' + err);
    //   }
