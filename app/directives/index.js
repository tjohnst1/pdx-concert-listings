export default concertListings => {
  require('./eventHeadline')(concertListings);
  require('./eventFilter')(concertListings);
  require('./sharingLinks')(concertListings);
  require('./header')(concertListings);
};
