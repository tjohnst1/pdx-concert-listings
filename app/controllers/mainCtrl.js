export default concertListings => {
  concertListings.controller('MainCtrl', ["EventsFactory", "$timeout", function(EventsFactory, $timeout){
    var vm = this;
    vm.events = EventsFactory.events;
    vm.venues = EventsFactory.venues;
    vm.filterOptions = {venue: "", startingDate: "", endingDate: ""};

    EventsFactory.getData().on("value", function(snapshot) {
     const fbSnapshot = snapshot.val();
     let events = Object.keys(fbSnapshot).map(key => fbSnapshot[key]);
      $timeout(function() {
        vm.events = events;
        vm.venues = EventsFactory.getVenues(events)
        console.log(vm.events)
        console.log(vm.venues)
      });
    });

  }]);
}
