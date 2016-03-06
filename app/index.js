import 'lodash';
import angular from 'angular';
import angularfire from 'angularfire';
import Firebase from 'firebase';
import 'angular-ui-router';
// import 'angular-google-maps-native';
import 'angular-utils-pagination';
import 'angular-simple-logger';
import 'angular-google-maps';

const concertListings = angular.module('concertListings', ['firebase', 'ui.router', 'nemLogging','uiGmapgoogle-maps', 'angularUtils.directives.dirPagination']);

concertListings.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.23', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})

require('./factories/eventsFactory')(concertListings);
require('./controllers')(concertListings);
require('./directives')(concertListings);
require('./filters')(concertListings);
require('./routes/routes')(concertListings);
