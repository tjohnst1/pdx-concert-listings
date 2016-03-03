export default concertListings => {
  concertListings.controller('EventsCtrl', ["EventsFactory", "$timeout", "$stateParams", function(EventsFactory, $timeout, $stateParams){
    var vm = this;

    vm.events = EventsFactory.events;
    vm.venues = EventsFactory.venues;
    vm.filterOptions = {venue: "", startingDate: "", endingDate: "", itemsPerPage: "20"};
    vm.event = {};
    vm.venueDirections = '';

    EventsFactory.getData().on("value", function(snapshot) {
     const fbSnapshot = snapshot.val();
     let events = Object.keys(fbSnapshot).map(key => fbSnapshot[key]);
      $timeout(function() {
        vm.events = events;
        vm.venues = EventsFactory.getVenues(events);
        vm.event = EventsFactory.getEventById(vm.events, Number($stateParams.eventId));
        vm.venueDirections = `https://maps.google.com?q=${vm.event.venue.address.replace(/\s/g, '+')}`;
      });
    });
  }]);
}
