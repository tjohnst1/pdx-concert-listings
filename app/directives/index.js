export default concertListings => {
  require('./eventHeadline')(concertListings);
  require('./eventFilter')(concertListings);
  require('./addToCalendar')(concertListings);
};
