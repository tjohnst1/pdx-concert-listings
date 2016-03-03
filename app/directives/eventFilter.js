export default concertListings => {
  concertListings.directive('eventFilter', () => {
    return {
      restrict: 'E',
      // controllerAs: 'eventFilterCtrl',
      scope: {
        venues: '=',
        selectedVenue: '=',
        startingDate: '=',
        endingDate: '=',
        itemsPerPage: '='
      },
      // bindToController: {
      //   venues: '=',
      //   selectedVenue: '=',
      //   startingDate: '=',
      //   endingDate: '=',
      //   itemsPerPage: '='
      // },
      // controller: function($scope){
      //   const eventFilterCtrl = this;
      //   eventFilterCtrl.currentVal = 20;
      // },
      template: require('../templates/eventFilter.html')
    }
  })
}
