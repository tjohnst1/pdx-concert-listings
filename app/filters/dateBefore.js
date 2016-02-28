import moment from 'moment';

export default concertListings => {
  concertListings.filter('dateBefore', () => {
    return function(events, inputDate){
      var filteredEvents = events.filter((event) => {
        return moment(event.eventDate.day).isSameOrBefore(inputDate);
      });
      if (filteredEvents.length === 0){
        return events;
      } else {
        return filteredEvents;
      }
    };
  });
}
