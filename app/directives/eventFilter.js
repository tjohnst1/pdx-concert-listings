export default concertListings => {
  concertListings.directive('eventFilter', () => {
    return {
      restrict: 'E',
      scope: {
        venues: '=',
        selectedVenue: '=',
        startingDate: '=',
        endingDate: '='
      },
      template: require('../templates/eventFilter.html')
    }
  })
}
