export default concertListings => {
  concertListings.filter('venueFilter', () => {
    return function(events, venue){
      var filteredEvents = events.filter((event) => {
        return event.venue.name === venue;
      });
      if (filteredEvents.length === 0){
        return events;
      } else {
        return filteredEvents;
      }
    };
  });
}
