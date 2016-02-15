import moment from 'moment';

export default concertListings => {
  concertListings.filter('dateAfter', () => {
    return function(events, inputDate){
      var filteredEvents = events.filter((event) => {
        return moment(event.date.day).isSameOrAfter(inputDate);
      });
      if (filteredEvents.length === 0){
        return events;
      } else {
        return filteredEvents;
      }
    };
  });
}
