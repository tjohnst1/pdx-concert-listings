export default concertlistings => {

  concertListings.directive('addToCalendar', function(){
    return {
      restrict: 'E',
      scope: {
        title: '=',
        location: '=',
        description: '=',
        startDate: '=',
        endDate: '='
      },
      template: require('../templates/addToCalendar.html')
    }
  })
  });



}
