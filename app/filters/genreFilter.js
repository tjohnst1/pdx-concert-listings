export default concertListings => {
  concertListings.filter('genreFilter', () => {
    return function(events, genre){
      var filteredEvents = events.filter((event) => {
        if (!event.artists.genre){
          return false;
        };
        const lcGenres = event.artists.genre.map((genreName) => genreName.toLowerCase());
        return lcGenres.indexOf(genre) !== -1;
      });
      if (filteredEvents.length === 0){
        return events;
      }
      return filteredEvents;
    };
  });
}
