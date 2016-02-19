import angular from 'angular';
import angularfire from 'angularfire';
import Firebase from 'firebase';

const concertListings = angular.module('concertListings', ['firebase']);

require('./controllers')(concertListings);
require('./directives')(concertListings);
require('./filters')(concertListings);
