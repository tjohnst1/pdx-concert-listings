export default concertListings => {
  concertListings.directive('eventFilter', () => {
    return {
      restrict: 'E',
      controllerAs: 'eventFilterCtrl',
      bindToController: {
        venues: '=',
        selectedVenue: '=',
        startingDate: '=',
        endingDate: '=',
        itemsPerPage: '='
      },
      controller: function(){
        
      },
      template: require('../templates/eventFilter.html')
    }
  })
}
