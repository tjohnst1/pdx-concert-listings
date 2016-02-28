export default concertListings => {
  concertListings.directive('addToCalendar', function(){
    return {
      restrict: 'E',
      template: require('../templates/addToCalendar.html'),
      controllerAs: 'calendarCtrl',
      bindToController: {
        title: '=',
        day: '=',
        time: '=',
        venue: '=',
        address: '=',
      },
      controller: function($scope){
        const calendarCtrl = this;
        calendarCtrl.formattedValues = {};
        calendarCtrl.gCalendar = '';
        console.log('arr:', calendarCtrl.eventDate);
        $scope.$watchCollection('[calendarCtrl.title, calendarCtrl.day, calendarCtrl.time, calendarCtrl.venue, calendarCtrl.address]',
          function(newVals, oldVals){
            if (newVals[0] !== undefined){
              const formattedValues = {
                title: newVals[0].replace(/\s/g, "+"),
                startingTime: (new Date(`${newVals[1]} ${newVals[2]}`)).toISOString().replace(/-|:|\.\d\d\d/g,""),
                endingTime: (new Date(`${newVals[1]} 22:00:00`)).toISOString().replace(/-|:|\.\d\d\d/g,""),
                venue: newVals[3].replace(/\s/g, "+"),
                address: newVals[4].replace(/\s/g, "+"),
                details: `${newVals[0]}+@+${newVals[3]}`
              }
              calendarCtrl.gCalendar = `http://www.google.com/calendar/event?action=TEMPLATE&text=${formattedValues.title}&dates=${formattedValues.startingTime}/${formattedValues.endingTime}&details=${formattedValues.details}&location=${formattedValues.address}`
            }
          }
        )
      }
    }
  })
}
