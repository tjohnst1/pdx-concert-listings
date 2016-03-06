export default concertListings => {
  concertListings.directive('loadingAnimation', function(){
    return {
      restrict: 'E',
      scope: {},
      template: require('../templates/loadingAnimation.html'),
    }
  })
}
