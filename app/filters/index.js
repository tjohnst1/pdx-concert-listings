export default concertListings => {
  require('./dateAfter')(concertListings);
  require('./dateBefore')(concertListings);
  require('./venueFilter')(concertListings);
  require('./formatTime')(concertListings);
  require('./fixedNumLength')(concertListings);
  require('./limitBands')(concertListings);
};
