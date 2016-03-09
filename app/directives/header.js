export default concertListings => {
  concertListings.directive('header', () => {
    return {
      restrict: 'E',
      scope: {},
      controllerAs: 'headerCtrl',
      bindToController: {
        currentState: '='
      },
      controller: function(){
        const headerCtrl = this;
      },
      template: require('../templates/header.html')
    }
  });
};
