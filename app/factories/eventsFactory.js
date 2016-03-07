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
      return venueArr.sort();
    };

    EventsFactory.getGenres = (events) => {
      var filteredArr = [];
      events.forEach(function(eventObj){
        if (eventObj.artists.genre){
          const genresArr = eventObj.artists.genre.map((genre) => {
            return genre.toLowerCase();
          });
          genresArr.forEach((genre) => {
            if (filteredArr.indexOf(genre) === -1 && genre !== 'all'){
              filteredArr.push(genre);
            };
          });
        };
      });
      return filteredArr.sort();
    };

    EventsFactory.getData = () => {
      return new $window.Firebase('https://concertlistings.firebaseio.com/');
    }

    EventsFactory.getEventById = (events, id) => {
      return events.filter((event) => {
        return event.id === id
      })[0];
    }

    return EventsFactory;
  }]);
}
