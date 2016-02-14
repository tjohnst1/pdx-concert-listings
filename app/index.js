import angular from 'angular';
import angularfire from 'angularfire';
import Firebase from 'firebase';

const concertListings = angular.module('concertListings', ['firebase']);

concertListings.constant('FBURL', 'https://concertlistings.firebaseio.com/');

concertListings.service('FirebaseRef', ['FBURL', Firebase]);

concertListings.factory('Events', function(FirebaseRef, $firebaseArray){
  return $firebaseArray(FirebaseRef);
});

concertListings.controller('MainCtrl', function(Events){
  this.events = Events
});

require('./directives')(concertListings);
