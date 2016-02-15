export default concertListings => {
  require('./dateAfter')(concertListings);
  require('./dateBefore')(concertListings);
  require('./venueFilter')(concertListings);
};
