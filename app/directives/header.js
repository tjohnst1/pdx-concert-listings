export default concertListings => {
  concertListings.directive('header', () => {
    return {
      restrict: 'E',
      scope: {},
      template: require('../templates/header.html')
    }
  })
}
