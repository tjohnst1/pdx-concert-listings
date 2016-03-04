export default concertListings => {
  concertListings.directive('eventFilter', () => {
    return {
      restrict: 'E',
      controllerAs: 'eventFilterCtrl',
      scope: {
        venues: '=',
        selectedVenue: '=',
        startingDate: '=',
        endingDate: '=',
        itemsPerPage: '=',
        query: '='
      },
      bindToController: {
        venues: '=',
        selectedVenue: '=',
        startingDate: '=',
        endingDate: '=',
        itemsPerPage: '='
      },
      controller: function($scope){
        const eventFilterCtrl = this;
        eventFilterCtrl.toggleFilter = function(){
          eventFilterCtrl.showFilter = !eventFilterCtrl.showFilter;
        }
      },
      template: require('../templates/eventFilter.html')
    }
  })
}
