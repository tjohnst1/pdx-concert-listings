export default concertListings => {
  concertListings.controller('EventsCtrl', ["$scope", "EventsFactory", "$timeout", "$stateParams", "uiGmapGoogleMapApi", function($scope, EventsFactory, $timeout, $stateParams, uiGmapGoogleMapApi){
    var vm = this;

    vm.events = EventsFactory.events;
    vm.venues = EventsFactory.venues;
    vm.genres = EventsFactory.genres;
    vm.filterOptions = {venue: "", startingDate: "", endingDate: "", itemsPerPage: "20", query: "", genre: ""};
    vm.event = {};
    vm.currentState = 'Index';

    EventsFactory.getData().on("value", function(snapshot) {
     const fbSnapshot = snapshot.val();
     let events = Object.keys(fbSnapshot).map(key => fbSnapshot[key]);
      $timeout(function() {
        vm.events = events;
        vm.venues = EventsFactory.getVenues(events);
        vm.genres = EventsFactory.getGenres(events);
        if ($stateParams.eventId){
          vm.event = EventsFactory.getEventById(vm.events, Number($stateParams.eventId));
          uiGmapGoogleMapApi.then(function(maps) {
            vm.map = { center: { latitude: vm.event.venue.lat, longitude: vm.event.venue.lng }, zoom: 15 };
          });
          vm.currentState = 'Event';
        } else {
          vm.currentState = 'Index';
        }
      });
    });
  }]);
}
