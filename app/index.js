import angular from 'angular';
import angularfire from 'angularfire';
import Firebase from 'firebase';
import 'angular-ui-router';
import 'angular-google-maps-native';

const concertListings = angular.module('concertListings', ['firebase', 'ui.router', 'GoogleMapsNative']);

require('./factories/eventsFactory')(concertListings);
require('./controllers')(concertListings);
require('./directives')(concertListings);
require('./filters')(concertListings);
require('./routes/routes')(concertListings);
