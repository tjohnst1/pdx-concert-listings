import angular from 'angular';
import angularfire from 'angularfire';
import Firebase from 'firebase';

angular.module('concertListings', ['firebase'])

.constant('FBURL', 'https://concertlistings.firebaseio.com/')

.service('FirebaseRef', ['FBURL', Firebase])

.factory('Events', function(FirebaseRef, $firebaseArray){
  return $firebaseArray(FirebaseRef);
})

.controller('MainCtrl', function(Events){
  this.events = Events
});
