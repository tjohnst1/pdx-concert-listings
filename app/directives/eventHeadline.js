export default concertListings => {
  concertListings.directive('eventHeadline', function(){
    return {
      restrict: 'E',
      scope: {
        event: '='
      },
      template: require('../templates/eventHeadline.html')
    };
  });
};
