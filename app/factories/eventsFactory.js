import moment from 'moment';

export default concertListings => {

  concertListings.factory('EventsFactory', ['$window', function($window){
    let EventsFactory = {};

    EventsFactory.events = [];
    EventsFactory.venues = [];

    EventsFactory.getVenues = (events) => {
      var venueArr = [];
      events.forEach(function(eventObj){
        if (venueArr.indexOf(eventObj.venue.name) === -1) {
          venueArr.push(eventObj.venue.name);
        };
      });
      return venueArr;
    };

    EventsFactory.getData = () => {
      return new $window.Firebase('https://concertlistings.firebaseio.com/');
    }

    EventsFactory.getEventById = (events, id) => {
      return events.filter((event) => {
        return event.id === id
      })[0];
    }

    // EventsFactory.getCalendarLink = (event) => {
    //   const eventTitle = `${event.artists.artists.join(', ')} @ ${event.venue.name}`;
    //   const time = event.date.time || "";
    //   let eventStartDate = moment(new Date(event.date.day);
    //   if (time) {
    //     eventStartDate = moment(new Date(`${event.date.day}T${time}`));
    //   }
    //   console.log(eventTitle);
    //   console.log(eventDate);
    //   const id = event.id;
    //   return `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${eventDate}&details=See+the+following+for+more+info:+http://localhost:8080/#/events/${id}`
    // }

    return EventsFactory;
  }]);
}
