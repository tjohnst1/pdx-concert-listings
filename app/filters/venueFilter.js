import moment from 'moment';

export default concertListings => {
  concertListings.filter('venueFilter', () => {
    console.log('here')
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
