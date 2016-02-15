export default concertListings => {
  concertListings.directive('eventFilter', () => {
    return {
      restrict: 'E',
      scope: {
        events: '=',
      },
      template: require('../templates/eventFilter.html')
    }
  })
}
