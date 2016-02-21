export default concertListings => {
  concertListings.controller('EventCtrl', ['$stateParams', 'EventsFactory', function($stateParams, EventsFactory){
    const vm = this;
    const id = Number($stateParams.eventId);
    vm.event = EventsFactory.events;
    vm.something = 'blah'

    EventsFactory.getData().on("value", function(snapshot) {
     const fbSnapshot = snapshot.val();
     let events = Object.keys(fbSnapshot).map(key => fbSnapshot[key]);
      $timeout(function() {
        vm.events = events;
        vm.venues = EventsFactory.getVenues(events);
      });
    });
  }])
}
