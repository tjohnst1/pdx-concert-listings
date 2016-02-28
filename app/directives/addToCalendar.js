export default concertListings => {

  concertListings.directive('addToCalendar', function(){
    return {
      restrict: 'E',
      scope: {},
      template: require('../templates/addToCalendar.html'),
      bindToController: {
        title: '=',
        eventStart: '=',
        time: '=',
        venue: '=',
        address: '=',
      },
      controller: function($scope){
        const vm = this;
        $scope.$watch(function(){
          return vm.title
        }, function(updatedVal){
          console.log(updatedVal);
          vm.combined = updatedVal;
        })
      },
      controllerAs: 'vm'
    }
  })

}
