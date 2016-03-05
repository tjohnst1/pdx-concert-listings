// Setup
var fs = require('fs');
var request = require('request');
var async = require('async');
var Firebase = require('firebase');
var firebaseRef = new Firebase("https://concertlistings.firebaseio.com/");

// Clear Firebase before uploading new content
firebaseRef.remove(populateFirebase);

// Add content to firebase
function populateFirebase(){
  async.waterfall([
    getNumberOfEntries,
    getAllEvents,
    getVenueLocationData,
    getSpotifyInfo,
    getArtistDetails
  ], function (err, eventsArr){
    fs.writeFile('data.json', JSON.stringify({events: eventsArr}, null, 4), (err) => {
      if (err) throw err;
      console.log('It\'s saved!');
    });
    eventsArr.forEach(function(event){
      firebaseRef.push(event);
    })
  });
};

// Find out the number of pages of event data
function getNumberOfEntries(entriesCallback){
  var songkickAPI = "http://api.songkick.com/api/3.0/metro_areas/12283/calendar.json?apikey=ewhKf5A1zoFbcx0A";
  request(songkickAPI, function (error, response, body) {
    var json = JSON.parse(body);
    var totalEntries = Number(json.resultsPage.totalEntries);
    var numberOfPages = 2;
    entriesCallback(null, numberOfPages);
  })
};

// Get all of the event data
function getAllEvents(numberOfPages, allEventsCallback){
  var count = 1;
  var allEvents = [];
  async.whilst(
    function(){ return count <= numberOfPages },
    function(whilstCallback){
      var url = `http://api.songkick.com/api/3.0/metro_areas/12283/calendar.json?page=${count}&apikey=ewhKf5A1zoFbcx0A`;
      request(url, function (error, response, body) {
        var json = JSON.parse(body);
        var eventJson = json.resultsPage.results.event;
        var formattedEvents = [];
        eventJson.forEach(function(event){
          if ((event.start.time !== null) && (event.venue.displayName !== null) && (event.start.time !== undefined) && (event.venue.displayName !== undefined) && (event.venue.displayName !== 'Unknown venue')){
            formattedEvents.push({
              id: event.id,
              venue: {
                name: event.venue.displayName,
                lat: event.venue.lat,
                lng: event.venue.lng
              },
              artists: {
                artists: event.performance.map(function(artist){
                          return artist.artist.displayName
                         })
              },
              eventDate: {
                day: event.start.date,
                time: event.start.time
              }
            })
          }
        })
        allEvents.push(formattedEvents);
        count++;
        whilstCallback();
      })
    },
    function(err){
      var flattened = allEvents.reduce(function(a, b){ return a.concat(b) });
      allEventsCallback(null, flattened);
    }
  )
};

// Add venue location data via the Bing reverse geocoder
function getVenueLocationData(eventArr, venueLocationCallback){
  var eventsWithAddress = [];
  async.eachSeries(eventArr, function(event, callback){
    var lat = event.venue.lat;
    var lng = event.venue.lng;
    var url = `http://dev.virtualearth.net/REST/v1/Locations/${lat},${lng}?&key=AoptJWHwthubAVKukzeMwwRQmYJhKCUGuU1McqBvZM6TGobqdQoYvFn35G3vbHTH`;
    request(url, function (error, response, body) {
      var json = JSON.parse(body);
      var newEvent = event;
      newEvent.venue.address = json.resourceSets[0].resources[0].address.formattedAddress;
      newEvent.venue.directionsUrl = `https://maps.google.com?q=${newEvent.venue.address.replace(/\s/g, '+')}`;
      eventsWithAddress.push(newEvent);
      callback();
    });
  }, function(err){
      venueLocationCallback(null, eventsWithAddress);
  })
}

// Add artist info from Spotify
function getSpotifyInfo(eventArr, spotifyInfoCallback){
  var eventsWithSpotifyInfo = [];
  async.eachSeries(eventArr, function(event, callback){
    var artist = event.artists.artists[0].replace(/[^a-z\s]/gi, '').replace(/\s/g, '+');
    var url = `https://api.spotify.com/v1/search?q=${artist}&type=artist&market=US&limit=1`;
    request(url, function (error, response, body) {
      var newEvent = event;
      var json = JSON.parse(body);
      if (json.artists !== undefined && json.artists.items.length !== 0 && json.artists.items[0].images.length !== 0){
        newEvent.artists.image = json.artists.items[0].images[0].url;
        newEvent.artists.spotifyUrl = json.artists.items[0].external_urls.spotify;
      } else {
        newEvent.artists.image = null;
        newEvent.artists.spotifyUrl = null;
      };
      eventsWithSpotifyInfo.push(newEvent);
      callback();
    });
  }, function(err){
      spotifyInfoCallback(null, eventsWithSpotifyInfo);
  })
}

// Add artist info from Last.fm
function getArtistDetails(eventArr, artistDetailsCallback){
  var eventsWithArtistDetails = [];
  async.eachSeries(eventArr, function(event, callback){
    var artist = event.artists.artists[0].replace(/[^a-z\s]/gi, '').replace(/\s/g, '+');
    var url = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=5c9e0f93c61994caa29bb76e43c04389&format=json`;
    request(url, function (error, response, body) {
      var newEvent = event;
      var json = JSON.parse(body);
      if (json.error === undefined){
        newEvent.artists.bio = json.artist.bio.summary.replace(/<.+>/, '');
        newEvent.artists.genre = json.artist.tags.tag.map((tag) => {
          return tag.name.toLowerCase();
        });
        if (newEvent.artists.image === null && json.artist.image.length !== 0){
          newEvent.artists.image = json.artist.image[0]['#text'];
        }
      } else {
        newEvent.artists.bio = null;
        newEvent.artists.genre = null;
      };
      eventsWithArtistDetails.push(newEvent);
      callback();
    });
  }, function(err){
      artistDetailsCallback(null, eventsWithArtistDetails);
  })
}
