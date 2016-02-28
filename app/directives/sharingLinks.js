export default concertListings => {
  concertListings.directive('sharingLinks', function(){
    return {
      restrict: 'E',
      template: require('../templates/sharingLinks.html'),
      controllerAs: 'sharingLinksCtrl',
      bindToController: {
        title: '=',
        day: '=',
        time: '=',
        venue: '=',
        address: '=',
      },
      controller: function($scope, $location){
        const sharingLinksCtrl = this;
        sharingLinksCtrl.formattedValues = {};
        sharingLinksCtrl.gCalendar = '';
        sharingLinksCtrl.facebook = '';
        sharingLinksCtrl.twitter = '';
        sharingLinksCtrl.googlePlus = '';
        sharingLinksCtrl.email = '';
        console.log('arr:', sharingLinksCtrl.eventDate);
        $scope.$watchCollection('[sharingLinksCtrl.title, sharingLinksCtrl.day, sharingLinksCtrl.time, sharingLinksCtrl.venue, sharingLinksCtrl.address]',
          function(newVals, oldVals){
            if (newVals[0] !== undefined){
              const formattedValues = {
                title: newVals[0].replace(/\s/g, "+"),
                startingTime: (new Date(`${newVals[1]} ${newVals[2]}`)).toISOString().replace(/-|:|\.\d\d\d/g,""),
                endingTime: (new Date(`${newVals[1]} 22:00:00`)).toISOString().replace(/-|:|\.\d\d\d/g,""),
                venue: newVals[3].replace(/\s/g, "+"),
                address: newVals[4].replace(/\s/g, "+"),
                details: `${newVals[0]}+@+${newVals[3]}`,
                encodedEventUrl: encodeURIComponent($location.$$absUrl),
                encodedHeadline: encodeURIComponent(`${newVals[0]} @ ${newVals[3]} on ${newVals[1]}`),
                encodedDecription: encodeURIComponent(`Check out the following link for details: `)
              }
              sharingLinksCtrl.gCalendar = `http://www.google.com/calendar/event?action=TEMPLATE&text=${formattedValues.title}&dates=${formattedValues.startingTime}/${formattedValues.endingTime}&details=${formattedValues.details}&location=${formattedValues.address}`
              sharingLinksCtrl.facebook = `https://www.facebook.com/sharer/sharer.php?u=${formattedValues.encodedEventUrl}&t=${formattedValues.encodedHeadline}`;
              sharingLinksCtrl.twitter = `https://twitter.com/intent/tweet?source=${formattedValues.encodedEventUrl}&text=${formattedValues.encodedHeadline}:%20${formattedValues.encodedEventUrl}`;
              sharingLinksCtrl.googlePlus = `https://plus.google.com/share?url=${formattedValues.encodedEventUrl}`;
              sharingLinksCtrl.email = `mailto:?subject=${formattedValues.encodedHeadline}&body=${formattedValues.encodedHeadline}${formattedValues.encodedEventUrl}`;
            }
          }
        )
      }
    }
  })
}
