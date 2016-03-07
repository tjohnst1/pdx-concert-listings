export default concertListings => {
  concertListings.directive('eventFilter', () => {
    return {
      restrict: 'E',
      controllerAs: 'eventFilterCtrl',
      scope: {},
      bindToController: {
        venues: '=',
        selectedVenue: '=',
        startingDate: '=',
        endingDate: '=',
        itemsPerPage: '=',
        query: '=',
        selectedGenre: "=",
        genres: "="
      },
      controller: function(){
        const eventFilterCtrl = this;
      },
      template: require('../templates/eventFilter.html')
    }
  })
}
