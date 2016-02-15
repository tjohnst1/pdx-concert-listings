import angular from 'angular';
import angularfire from 'angularfire';
import Firebase from 'firebase';

const concertListings = angular.module('concertListings', ['firebase']);

concertListings.controller('MainCtrl',  ["$scope", "$timeout", "$window", function($scope, $timeout, $window){

  $scope.events = [];
  $scope.venues = [];

  function getVenues(eventsArr){
    var venues = [];
    eventsArr.forEach(function(eventObj){
      if (venues.indexOf(eventObj.venue.name) === -1) {
        venues.push(eventObj.venue.name);
      };
    });
    return venues;
  };

  var ref = new $window.Firebase('https://concertlistings.firebaseio.com/');
  ref.on("value", function(snapshot) {
    $timeout(function() {
      let events = snapshot.val();
      events = Object.keys(events).map(key => events[key]);
      $scope.events = events;
      $scope.venues = getVenues(events);
    });
  });

}]);

require('./directives')(concertListings);
