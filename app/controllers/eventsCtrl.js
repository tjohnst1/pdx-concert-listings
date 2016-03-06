export default concertListings => {
  concertListings.controller('EventsCtrl', ["$scope", "EventsFactory", "$timeout", "$stateParams", "uiGmapGoogleMapApi", function($scope, EventsFactory, $timeout, $stateParams, uiGmapGoogleMapApi){
    var vm = this;

    vm.events = EventsFactory.events;
    vm.venues = EventsFactory.venues;
    vm.filterOptions = {venue: "", startingDate: "", endingDate: "", itemsPerPage: "20", query: ""};
    vm.event = {};

    // uiGmapGoogleMapApi.then(function(maps) {
    //   vm.map = { center: { latitude: 45.5247002, longitude: -122.7142669 }, zoom: 12 };
    // });

    EventsFactory.getData().on("value", function(snapshot) {
     const fbSnapshot = snapshot.val();
     let events = Object.keys(fbSnapshot).map(key => fbSnapshot[key]);
      $timeout(function() {
        vm.events = events;
        vm.venues = EventsFactory.getVenues(events);
        if ($stateParams.eventId){
          vm.event = EventsFactory.getEventById(vm.events, Number($stateParams.eventId));
          // uiGmapIsReady.promise().then(function (maps) {
          //   $scope.control.refresh();
          // });
          uiGmapGoogleMapApi.then(function(maps) {
            vm.map = { center: { latitude: vm.event.venue.lat, longitude: vm.event.venue.lng }, zoom: 15 };
          });
        }
      });
    });
  }]);
}
