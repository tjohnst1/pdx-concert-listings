import angular from 'angular';
import angularfire from 'angularfire';
import Firebase from 'firebase';
import 'angular-ui-router';

const concertListings = angular.module('concertListings', ['firebase', 'ui.router']);

require('./factories/eventsFactory')(concertListings);
require('./routes/routes')(concertListings);
require('./controllers')(concertListings);
require('./directives')(concertListings);
require('./filters')(concertListings);
