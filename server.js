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
    getVenueLocationData
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
    var numberOfPages = Math.floor(totalEntries / 50);
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
          formattedEvents.push({
            id: event.id,
            venue: {
              name: event.venue.displayName,
              lat: event.venue.lat,
              lng: event.venue.lng
            },
            artists: event.performance.map(function(artist){
              return artist.artist.displayName
            }),
            date: {
              day: event.start.date,
              time: event.start.time
            }
          })
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
      eventsWithAddress.push(newEvent);
      callback();
    });
  }, function(err){
      venueLocationCallback(null, eventsWithAddress);
  })
}
