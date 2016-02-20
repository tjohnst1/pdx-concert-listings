export default concertListings => {
  require('./eventsCtrl')(concertListings);
  require('./eventCtrl')(concertListings);
};
